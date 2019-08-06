<template>
  <div>
    {{msg}}
    <div @click='go'>turn to foo</div>

  </div>
 
</template>

<script>
export default {
  data() {
    return {
      msg: 'bar page'
    }
  },
  methods: {
    go() {
      this.$tsRouter.push({path:'/foo'});
    }
  }
}
</script>