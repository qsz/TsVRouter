import TsVue from "../types/vue";


const RouterLink: TsVue.TsComponentOptions =  {
    props: {
        to: {
            type: Object,
            required: true
        }
    },
    name: 'RouterLink',
    render(this: TsVue.TVue, h: TsVue.TsCreateElement) {
        let data = Object.create(null)
        const tsRouter = this.$tsRouter
        const {nameToPath} = tsRouter.maper;
        const {path, name} = this.$props.to;
        const url = name && nameToPath[name] ? nameToPath[name]: path;
        data['attrs'] = {
            href: url
        }
        data['on'] = {
            click: (event: Event) => {
                event.preventDefault();
                tsRouter.push({ path: url, name }, url)
            }
        }
        return h('a', data, this.$slots.default )
    }
}

export default RouterLink