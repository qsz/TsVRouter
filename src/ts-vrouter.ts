import { install } from "./install"; 
import { TsRouter, RouterMode, TsRouterOptions, RouterModeValue, Route } from './types/index'
import createMap, { Maper } from './create-map'
import Html5History from "./history/html5";
import HashHistory from "./history/hash";

export default class TsVRouter extends TsRouter{
  static install = install;
  mode: RouterMode;
  options: TsRouterOptions;
  maper: Maper;
  history: Html5History | HashHistory;

  constructor(options: TsRouterOptions = { routes: []}) {
    super()
    this.options = options;
    this.mode = options.mode || RouterModeValue.hash;
    this.maper = createMap(options.routes);
    switch(options.mode) {
      case RouterModeValue.hash:
        this.history = new HashHistory(this);
        break;
      case RouterModeValue.html5:
        if(window.hasOwnProperty('onpopstate')) { 
          this.history = new Html5History(this);
        } else { // 降级处理
          this.history = new HashHistory(this);
        }
        break;
      default:
        this.history = new HashHistory(this);
        break;    
    }
  }
  push(state: Route, url: any): void {
    this.history.push(state, url)
  }
  replace(state: Route, url: any): void {
    this.history.replace(state, url)
  }
  go(n: number): void {
     this.history.go(n)
  }
}
