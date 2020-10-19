import { interpret, Machine } from "xstate";

const timeOfDayMachine = Machine({
  id: 'timeOfDay',
  // 当前不知道是什么状态
  initial: 'unknown',
  context: {
    time: undefined
  },
  states: {
    // Transient state
    unknown: {
      on: {
        '': [
          { target: 'morning', cond: 'isBeforeNoon' },
          { target: 'afternoon', cond: 'isBeforeSix' },
          { target: 'evening' }
        ]
      }
    },
    morning: {},
    afternoon: {},
    evening: {}
  }
}, {
  guards: {
    isBeforeNoon: (context) => {
      return  context.time < 1000
    },
    isBeforeSix: (context) => {
      return context.time < 10000000
    },
}
});

const timeOfDayService = interpret(timeOfDayMachine
  .withContext({ time: Date.now() }))
  .onTransition(state => console.log(state.value))
  .start();