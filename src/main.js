import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    data: {
      colors: []
    },
    render: h => h(App)
}).$mount('#app')
