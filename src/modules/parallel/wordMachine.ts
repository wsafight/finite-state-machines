import { Machine } from "xstate";

export const wordMachine = Machine({
  id: 'word',
  type: 'parallel',
  states: {
    bold: {
      initial: 'off',
      states: {
        on: {
          on: {TOGGLE_BOLD: 'off'}
        },
        off: {
          on: {TOGGLE_BOLD: 'on'}
        }
      }
    },
    underline: {
      initial: 'off',
      states: {
        on: {
          on: {TOGGLE_UNDERLINE: 'off'}
        },
        off: {
          on: {TOGGLE_UNDERLINE: 'on'}
        }
      }
    },
    italics: {
      initial: 'off',
      states: {
        on: {
          on: {TOGGLE_ITALICS: 'off'}
        },
        off: {
          on: {TOGGLE_ITALICS: 'on'}
        }
      }
    },
    list: {
      initial: 'none',
      states: {
        none: {
          on: {BULLETS: 'bullets', NUMBERS: 'numbers'},
        },
        bullets: {
          on: {NONE: 'none', NUMBERS: 'numbers'}
        },
        numbers: {
          on: {BULLETS: 'bullets', NONE: 'none'}
        }
      }
    }
  },
})

const boldState = wordMachine.transition('bold.off', 'TOGGLE_BOLD').value

