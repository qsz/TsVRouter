import BaseHistory from "./base";
import { Route, TsRouter } from '../types/index'

class HashtHistory extends BaseHistory {
    constructor(rootRouter: TsRouter) {
        super(rootRouter);
        window.addEventListener('hashchange', () => {
            const {pathToName} = rootRouter.maper
            const path = window.location.hash.split('#')[1]
            const name = pathToName[path]
            this.current = {
                path,
                name,
                hash: window.location.hash
            }
        })
    }
    push(state: Route, url?: any): void {
        const hash = this.getUrl(state, url)
        window.location.hash = hash || ''
    }
    replace(state: Route, url?: any): void {
        const hash = this.getUrl(state, url)
        const href = window.location.href
        window.location.replace(`${href.split('#')[0]}#${hash}`)
    }
}

export default HashtHistory