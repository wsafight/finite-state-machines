import {
  shallowRef,
  watch,
  isRef,
  onMounted,
  onBeforeUnmount,
  Ref
} from 'vue'
import {
  interpret,
  EventObject,
  StateMachine,
  State,
  Interpreter,
  InterpreterOptions,
  MachineOptions,
  StateConfig,
  Typestate
} from 'xstate'

interface UseMachineOptions<TContext, TEvent extends EventObject> {
  context?: Partial<TContext>,
  state?: StateConfig<TContext, TEvent>
}

export function useMachine<TContext,
  TEvent extends EventObject,
  TTypeState extends Typestate<TContext> = { value: any, context: TContext }>(
  machine: StateMachine<TContext, any, TEvent, TTypeState>,
  options: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent> &
      Partial<MachineOptions<TContext, TEvent>>> = {}
){
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    state: rehydrateState,
    ...interpreterOptions
  } = options

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays
  }

  const createMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context
  })

  const initialState = rehydrateState ? State.create(rehydrateState) : undefined

  const service = interpret(createMachine, interpreterOptions).start(initialState)

  const state = shallowRef(service.state)

  onMounted(() => {
    service.onTransition((currentState) => {
      if (currentState.changed) {
        state.value = currentState
      }
    })

    state.value = service.state
  })

  onBeforeUnmount(() => {
    service.stop()
  })

  return {state, send: services.send, service}
}

export function useService(service: any) {
  const serviceRef = isRef(service) ? service : shallowRef(service)
  const state = shallowRef(serviceRef.value.state)

  watch(
    serviceRef,
    (service, _, onCleanup) => {
      state.value = service.state
      const {unsubscribe} = service.subscribe((currentState) => {
        if (currentState.changed) {
          state.value = currentState
        }
      })
      onCleanup(() => unsubscribe())
    },
    {
      immediate: true
    }
  )

  const send = (event) => serviceRef.value.send(event)

  return {state, send, serviceRef}
}