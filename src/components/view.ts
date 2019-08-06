import  TsVue from "../types/vue";

const RouterView: TsVue.TsComponentOptions =  {
    name: 'RouterView',
    render(this: TsVue.TVue, h: TsVue.TsCreateElement) {
        const maper = this.$tsRouter.maper;
        const {path, name} = this.$tsRoute;
        const {nameMap, pathMap} = maper;
        const component = name && nameMap[name] ? nameMap[name]: (path && pathMap[path] ? pathMap[path]: '')
        return h(component , {}, this.$slots.default)
    }
}

export default RouterView

// 1. CreateElement
// Vue.js 利用 createElement 方法创建 VNode
// export function createElement (
//     context: Component,
//     tag: any,
//     data: any,
//     children: any,
//     normalizationType: any,
//     alwaysNormalize: boolean
//   ): VNode | Array<VNode> {
//     if (Array.isArray(data) || isPrimitive(data)) {
//       normalizationType = children
//       children = data
//       data = undefined
//     }
//     if (isTrue(alwaysNormalize)) {
//       normalizationType = ALWAYS_NORMALIZE
//     }
//     return _createElement(context, tag, data, children, normalizationType)
//   }
// 真正创建虚拟dom是 _createElement方法
// export function _createElement (
//     context: Component,
//     tag?: string | Class<Component> | Function | Object,
//     data?: VNodeData,
//     children?: any,
//     normalizationType?: number
//   )
// 其中 tag 可接受 string | Class<Component> | Function | Object
// data为VNodeData类型
// 在types/vnode.d.ts
// export interface VNodeData {
//     key?: string | number;
//     slot?: string;
//     scopedSlots?: { [key: string]: ScopedSlot | undefined };
//     ref?: string;
//     refInFor?: boolean;
//     tag?: string;
//     staticClass?: string;
//     class?: any;
//     staticStyle?: { [key: string]: any };
//     style?: string | object[] | object;
//     props?: { [key: string]: any };
//     attrs?: { [key: string]: any };
//     domProps?: { [key: string]: any };
//     hook?: { [key: string]: Function };
//     on?: { [key: string]: Function | Function[] };
//     nativeOn?: { [key: string]: Function | Function[] };
//     transition?: object;
//     show?: boolean;
//     inlineTemplate?: {
//       render: Function;
//       staticRenderFns: Function[];
//     };
//     directives?: VNodeDirective[];
//     keepAlive?: boolean;
//   }
