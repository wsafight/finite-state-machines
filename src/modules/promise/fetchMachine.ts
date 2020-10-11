import { assign, createMachine } from "xstate";

const fetchMachine = createMachine({
  id: 'SWAPI',
  initial:'idle',
  context: () => {
    user: null
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading'
      }
    },
    loading: {
      invoke: {
        id: 'FetchLuke',
        src: (context, event) => fetch('https://swapi.dev/api/people/1')
          .then((res: any) => res.data),
        onDone: {
          target: 'resolved',
          actions: assign({
            user: (_, event) => event.data
          })
        },
        onError: 'rejected'
      },
      on: {
        CANCEL: 'idle'
      }
    },
    resolved: {
      type: 'final'
    },
    rejected: {
      on: {
        FETCH: 'loading'
      }
    }
  }
})