import RouterView from './components/view'
import RouterLink from './components/link'
import TsVue from "./types/vue";

// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器
export function install(this: TsVue.TVue, Vue: TsVue.TsConstructor) {
    Vue.mixin({
        beforeCreate (this: TsVue.TVue) {
          // 这里的 this 是 Vue根实例, 为每个Vue根实例缓存一个Vue根实例， 方便Vue组件实例中读取到Vue根实例
          // 根实例中的 $options 与 组件实例中 的$options 不同
          // 其中之一是根实例中的 $options 可以获取到配置项
          // 配置项中有我们的router实例
          if(this.$options.tsRouter) { // 说明是 根实例
            this._tsRouterRoot = this;
            this._tsRouter = this.$options.tsRouter;
            // 关键的地方，将_tsRoute变为响应式, 既将this._tsRouter.history和其子属性变为响应式
            Vue.util.defineReactive(this, '_tsRoute', this._tsRouter.history) // history 为路由实例的history对象
          } else {
            // 把 _tsRouterRoot 传递给 组件实例
            this._tsRouterRoot = (this.$parent && this.$parent._tsRouterRoot) || this
          }
        }
    })

    // 为什么不直接 Vue.prototype.$tsRouter = this.$options.tsRouter
    // 为每个Vue组件实例注入$tsRouter，用于获取当前的router实例
    Object.defineProperty(Vue.prototype, '$tsRouter', {
      get () { 
        return this._tsRouterRoot._tsRouter 
      }
    })

    // $tsRoute： 当前路由信息
    Object.defineProperty(Vue.prototype, '$tsRoute', {
      get () { 
        return this._tsRouterRoot._tsRoute.current   // current为当前路由信息
        // return this._tsRouterRoot._tsRouter.history   // current为当前路由信息
      }
    })
    // 全局注册组件
    Vue.component('tsrouter-view', RouterView)
    Vue.component('tsrouter-link', RouterLink)
} 


// 备注：
// 在这里用到的知识
// 1. 开发插件 - install
// Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象

// 2. vm.$options 配置项
// // vm.$options 会区分 new 和组件内
// // 用于获取当前 Vue 实例的初始化选项 
// new Vue({
//   customOption: 'foo',
//   created: function () {
//     console.log(this.$options.customOption) // => 'foo'
//   }
// })

// 3.  Vue.mixin
// 全局混入 一旦使用全局混入，它将影响每一个之后创建的 Vue 实例
// 为自定义的选项 'myOption' 注入一个处理器。
// 使用恰当时，这可以用来为自定义选项注入处理逻辑
// Vue.mixin({
//   created: function () {
//     var myOption = this.$options.myOption
//     if (myOption) {
//       console.log(myOption)
//     }
//   }
// })
// new Vue({
//   myOption: 'hello!'
// })
// // => "hello!"

// 4. Vue.component( id, [definition] )
// 注册或获取全局组件

// 5. 添加 Vue 实例方法
// 把它们添加到 Vue.prototype 上实现

// 6. Vue.utils.defineReactive
// 将一个对象的子对象递归调用Object.defineProperty，使该对象的所有子对象都具有响应式
// export function defineReactive (
//   obj: Object,
//   key: string,
//   val: any,
//   customSetter?: ?Function,
//   shallow?: boolean
// ) {
//   const dep = new Dep()

//   const property = Object.getOwnPropertyDescriptor(obj, key)
//   if (property && property.configurable === false) {
//     return
//   }

//   // cater for pre-defined getter/setters
//   const getter = property && property.get
//   const setter = property && property.set
//   if ((!getter || setter) && arguments.length === 2) {
//     val = obj[key]
//   }

//   let childOb = !shallow && observe(val)
//   Object.defineProperty(obj, key, {
//     enumerable: true,
//     configurable: true,
//     get: function reactiveGetter () {
//       const value = getter ? getter.call(obj) : val
//       if (Dep.target) {
//         dep.depend()
//         if (childOb) {
//           childOb.dep.depend()
//           if (Array.isArray(value)) {
//             dependArray(value)
//           }
//         }
//       }
//       return value
//     },
//     set: function reactiveSetter (newVal) {
//       const value = getter ? getter.call(obj) : val
//       /* eslint-disable no-self-compare */
//       if (newVal === value || (newVal !== newVal && value !== value)) {
//         return
//       }
//       /* eslint-enable no-self-compare */
//       if (process.env.NODE_ENV !== 'production' && customSetter) {
//         customSetter()
//       }
//       // #7981: for accessor properties without setter
//       if (getter && !setter) return
//       if (setter) {
//         setter.call(obj, newVal)
//       } else {
//         val = newVal
//       }
//       childOb = !shallow && observe(newVal)
//       dep.notify()
//     }
//   })
// }