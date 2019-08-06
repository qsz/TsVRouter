import Vue, { ComponentOptions } from "vue";
import {History} from '../history/base'
import { Maper } from '../create-map'

// hash 作为 history的降级
export type RouterMode = 'html5' | 'hash'
export enum RouterModeValue {
    html5 = 'html5',
    hash = 'hash'
}
// 单个Route接口
export interface Route {
    path ?: string
    name ?: string
    hash ?: string
}

// 单个Route配置
export interface RouteConfig {
    path : string
    name ?: string
    component : ComponentOptions<Vue>
}

// 参数类型接口
export interface TsRouterOptions {
    routes : RouteConfig[]
    mode ?: RouterMode
}

export abstract class TsRouter {
    static install: Function;
    abstract mode: RouterMode;
    abstract options: TsRouterOptions;
    abstract push(state: Route, url: any): void;
    abstract replace(state: Route, url: any): void;
    abstract go(n: number): void;
    abstract maper: Maper;
    abstract history: History;
}

