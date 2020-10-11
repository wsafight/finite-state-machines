<template>
  <h1>{{ msg }}</h1>
  <button @click="send('TOGGLE');">
    {{ state.matches("inactive") ? "Off" : "On" }}
  </button>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { interpret } from 'xstate';
import { toggleMachine } from './toggleMachine';

export default {
  props: {
    msg: String
  },
  setup(props) {
    const currentState = reactive({
      state: toggleMachine.initialState,
    })

    const toggleService = interpret(toggleMachine)

    toggleService.onTransition(state => {
      currentState.state = state;
    }).start();

    return {
      ...toRefs(currentState),
      send: (event) => toggleService.send(event)
    }
  },
}
</script>
