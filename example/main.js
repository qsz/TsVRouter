// main.js
import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import TsVRouter from '../src/ts-vrouter'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 注册路由
Vue.use(TsVRouter)
const tsRouter = new TsVRouter({
  mode: 'html5',
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