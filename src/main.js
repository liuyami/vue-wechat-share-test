import Vue from 'vue'
import App from './App.vue'
import WechatJSSDK from 'WechatJSSDK'

Vue.config.productionTip = false

let wxJssdk = new WechatJSSDK();

// Vue.use(wxJssdk);
Object.defineProperty(Vue.prototype, '$wxJssdk', { value: wxJssdk });

new Vue({
  render: h => h(App),
}).$mount('#app')
