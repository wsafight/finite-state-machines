import { Machine } from "xstate";

const wordMachine = Machine({
  id: 'word',
  initial: 'left',
  states: {
    left: {},
    right: {},
    center: {},
    justify: {}
  },
  on: {
    LEFT_CLICK: '.left',
    JUSTIFY_CLICK: {target: '.justify', internal: true}
  }
})