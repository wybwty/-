const components = []

const srcContext = require.context('@/components', true, /\.vue$/)
srcContext.keys().forEach(item => {
  let src = srcContext(item)
  if (!src.default.name) {
    src.default.name = item.split('/').pop().replace(/\.vue$/, '')
  }
  components.push(src)
})

const install = function (Vue) {
  components.map(component => {
    let name = component.default.name
    Vue.component(name, component.default)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  install
}
