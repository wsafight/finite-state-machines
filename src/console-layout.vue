<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <div>
      <span v-for="route in routes" :key="route.name">
        <router-link :to="route.url">
        {{ route.name }}
     </router-link>
    </span>
    </div>

    <div></div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";


interface ShowRoute {
  name: string;
  url: string;
}

export default {
  setup() {
    return {
      routes: [{
        name: '基础切换',
        url: '/'
      }] as ShowRoute[]
    }
  }
}
</script>