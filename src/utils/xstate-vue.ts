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
