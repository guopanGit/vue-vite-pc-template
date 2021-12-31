import {createStore} from 'vuex'
import cache from "./cache";

const files = import.meta.globEager('./modules/*.js')

let modules = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})

const cacheVue = cache({
  key: 'vuex', modules, modulesKeys: {
    local: Object.keys(modules),
  }
})
// 查看sessionStorage  记得删除
const sessionOldState = JSON.parse(sessionStorage.getItem('vuex'))
console.log(sessionOldState);

export default createStore({
  modules: {
    ...modules
  },
  plugins: [cacheVue]
})