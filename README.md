# ts-vrouter
ts实现一个简易的vue-router

### api
* tsRouter.push：router.push({ path: 'home' })
* tsRouter.replace(...)
* tsRouter.go(number)

### demo 
main.js
```js
import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import TsVRouter from './src/ts-vrouter'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 注册路由
Vue.use(TsVRouter)
const tsRouter = new TsVRouter({
  mode: 'history',
  routes: [
    {path: '/foo', component: Foo, name: 'foo'},
    {path: '/bar', component: Bar, name: 'bar'}
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  tsRouter
})

```
App.vue: 
```html
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
```