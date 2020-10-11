import { Machine } from "xstate";

const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: {TOGGLE: 'active'}
    },
    active: {
      activities: ['beeping'],
      on: {TOGGLE: 'inactive'}
    }
  }
}, {
  activities: {
    beeping: () => {
      const interval = setInterval(() => console.log('DEEP!'), 1000)
      return () => clearInterval(interval)
    }
  }
})