<!-- App.vue --> 
<template>
  <div>
    <h2>{{msg}}</h2>
    <tsrouter-link :to="{path: '/foo'}">跳转到 foo</tsrouter-link>
    <tsrouter-link :to="{path: '/bar'}">跳转到 bar</tsrouter-link>
    <tsrouter-view></tsrouter-view>
  </div>
</template>

<script>
export default {
  created() {
  },
  data() {
    return {
      msg: 'i am ts-vrouter demo'
    }
  }
}
</script>