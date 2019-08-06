import BaseHistory from "./base";
import { Route, TsRouter } from '../types/index'

class Html5History extends BaseHistory {
    constructor(rootRouter: TsRouter) {
        super(rootRouter);
        window.addEventListener('popstate', (event) => { // history.go 才会触发popstate事件
            this.current = event.state                   // 改变当前路由信息
        })
    }
    push(state: Route, url?: any): void {
        history.pushState(state, '', this.getUrl(state, url))
        this.current = state
    }
    replace(state: Route, url?: any): void {
        history.replaceState(state, '', this.getUrl(state, url))
        this.current = state
    }
}

export default Html5History


// api
// https://developer.mozilla.org/zh-CN/docs/Web/API/History_API