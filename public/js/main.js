import { router } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'

const options = {
  template: `
  <app-header/>
  <router-view/>
  <user-msg></user-msg>
    `,
  data() {
    return {}
  },
  components: {
    appHeader,
    userMsg,
  },
}

const app = Vue.createApp(options)
app.use(router)
app.mount('#app')
