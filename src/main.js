import Vue from 'vue'
import App from './App.vue'
import WechatJSSDK from '@yushuo/wechat-jssdk'
import Vconsole from 'vconsole'

Vue.config.productionTip = false

let vConsole = new Vconsole()
Vue.use(vConsole)

let wxJssdk = new WechatJSSDK({
  debug: true,
  desc: "测试DEMO，仅供参考",
  imgUrl:"https://yami.h5.yscase.com/test-wechat/v2/img/logo.82b9c7a5.png"
});
Object.defineProperty(Vue.prototype, '$wxJssdk', { value: wxJssdk });

new Vue({
  render: h => h(App),

}).$mount('#app')
