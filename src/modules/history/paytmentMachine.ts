import { Machine } from "xstate";

export const paymentMachine = Machine({
  id: 'payment',
  initial: 'method',
  states: {
    method: {
      initial: 'cash',
      states: {
        cash: {on: {SWITCH_CHECK: 'check'}},
        check: {on: {SWITCH_CASH: 'cash'}},
        hist: {type: 'history'}
      },
      on: {NEXT: 'review'}
    },
    review: {
      on: {PREVIOUS: 'method.hist'}
    }
  }
});

const checkState = paymentMachine.transition('method.cash', 'SWITCH_CHECK')

const reviewState = paymentMachine.transition(checkState, 'NEXT')

const previousState = paymentMachine.transition(reviewState, 'PREVIOUS')

console.log(previousState.value)