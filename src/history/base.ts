import { Route, TsRouter } from '../types/index'

export interface History {
    current: Route;
    rootRouter: TsRouter;
    push(state: Route, url: any): void;
    replace(state: Route,url: any): void;
    go(n: number): void;
}

class BaseHistory {
    // 当前路由
    current: Route = {path:'/'}
    // 根路由对象
    rootRouter: TsRouter;
    constructor(rootRouter: TsRouter) {
        this.rootRouter = rootRouter
    }
    push(state: Route, url: any): void {
        // TODO   
    }
    replace(state: Route, url: any): void {
        // TODO
    }
    go(n: number): void {
        history.go(n)
    }
    getUrl(state: Route, url = '/'): string | null | undefined {
        const {nameToPath} = this.rootRouter.maper
        const {path, name} = state;
        url = url || '/'
        if(nameToPath && name) {
            url = nameToPath[name] || '/'
        } else {
            if(path) {
                url = path
            }
        } 
        return url
    }
}
export default BaseHistory


