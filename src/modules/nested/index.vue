<template>
  <button @click="send('TIMER');">
    {{ light.value }}
  </button>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { interpret } from 'xstate';
import { lightMachine } from './lightMachine';

export default {
  setup(props) {
    const state = reactive({
      light: lightMachine.initialState
    })

    const toggleService = interpret(lightMachine)

    toggleService.onTransition(currentState => {
      state.light = currentState;
    }).start();

    return {
      ...toRefs(state),
      send: (event) => toggleService.send(event)
    }
  },
}
</script>
