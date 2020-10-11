import { Machine } from "xstate";

const searchValid = (context, event) => {
  return context.canSearch && event.query?.length
}

const searchMachine = Machine({
  id: 'search',
  initial: 'idle',
  context: {
    canSearch: true,
  }
})