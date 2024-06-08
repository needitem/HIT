import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from "@/store/index.js";


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()  // 이벤트 버스용 빈 인스턴스



new Vue({
  router,
  vuetify,
  render: h => h(App),
  store: store,
}).$mount('#app')


