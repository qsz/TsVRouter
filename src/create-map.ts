// 创建 path 和 name的路由映射表
import { RouteConfig } from "./types/index";
import TsVue from "./types/vue";

interface NameMap {
    [name: string]: TsVue.TsComponentOptions
}

interface PathMap {
    [path: string]: TsVue.TsComponentOptions
}

interface NameToPath {
    [path: string]: string
}

interface PathToName {
    [name: string]: string
}

export interface Maper {
    nameMap: NameMap,
    pathMap: PathMap,
    nameToPath: NameToPath,
    pathToName: PathToName
}

export default function createMap(routes: RouteConfig[]): Maper {
    let nameMap = Object.create(null);
    let pathMap = Object.create(null);
    let nameToPath = Object.create(null);
    let pathToName = Object.create(null);
    routes.forEach((route: RouteConfig) => {
        const { path, name, component} = route
        if(name) {
            nameMap[name] = component;
            nameToPath[name] = path;
        }
        if(path){
            pathMap[path] = component;
            pathToName[path] = name;
        }
    })
    return {
        nameMap,
        pathMap,
        nameToPath,
        pathToName
    }
} 