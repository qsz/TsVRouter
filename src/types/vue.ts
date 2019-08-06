import Vue, { CreateElement, VueConstructor, ComponentOptions } from "vue";
import { TsRouter, Route } from './index'


namespace TsVue {
    export interface TsConstructor extends VueConstructor {
        util: {
            defineReactive: Function
        } 
    } 
    export interface TsCreateElement extends CreateElement {}
    export interface TsComponentOptions extends ComponentOptions<Vue> {}
    export interface $options extends ComponentOptions<Vue> {}
    export interface TVue extends Vue {
        $options: ComponentOptions<Vue> & { tsRouter: TsRouter};
        $tsRouter: TsRouter;
        $tsRoute: Route;
        $parent: TVue;
        _tsRouterRoot: TVue;
        _tsRouter: TsRouter;
        _tsRoute: Route;
    }
}

export default TsVue


