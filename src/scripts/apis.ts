import { Machine, State } from "xstate";

const lightMachine = Machine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        TIMER: 'yellow'
      },
      entry: 'alertGreen'
    },
    yellow: {
      on: {
        TIMER: 'red'
      }
    },
    red: {
      on: {
        TIMER: 'green'
      }
    }
  }
}, {
  actions: {
    alertGreen: (context, event) => {
      alert('green')
    }
  }
})

lightMachine.withConfig({
  guards: {}
})

lightMachine.withContext({
  elapsed: 1000,
  direction: 'north'
})

const state = lightMachine.transition('green', 'TIMER');

console.log(state.nextEvents)
console.log(state.matches)

const answerMachine = Machine({
  initial: 'unanswered',
  states: {
    unanswered: {
      on: {
        ANSWER: 'answered'
      }
    },
    answered: {
      type: "final"
    }
  }
})


const answerState = answerMachine.transition(answerMachine.initialState, 'ANSWER')
console.log(answerState.done)

console.log(answerState.toStrings())

// if 瞬时状态

const isAudit = ({age}: { age: number }) => age >= 18
const isMinor = ({age}: { age: number }) => age < 18

const ageMachine = Machine({
  id: 'age',
  context: {age: undefined},
  initial: 'unknow',
  states: {
    unknow: {
      on: {
        '': [
          {target: 'adult', cond: isAudit},
          {target: 'child', cond: isMinor}
        ]
      }
    },
    audit: {type: "final"},
    child: {type: 'final'}
  }
})

const personState = ageMachine.withContext({age: 28})
console.log(personState.initialState.value)