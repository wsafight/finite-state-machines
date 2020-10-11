<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png"/>
    <div>
      <span style="margin: 0 10px" v-for="route in routes" :key="route.name">
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

interface ShowRoute {
  name: string;
  url: string;
}

export default {
  setup() {
    return {
      routes: [ {
        name: '介绍测试',
        url: '/'
      },{
        name: '基础切换',
        url: '/toggle'
      }, {
        name: '黄绿灯转换',
        url: '/simple'
      }] as ShowRoute[]
    }
  }
}
</script>