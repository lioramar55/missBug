import { eventBus } from '../services/event-bus.service.js'
export default {
  name: 'user-msg',
  template: `
  <section v-if="msg.txt" :class="['user-msg', msg.type]">
    {{msg.txt}}
  </section>`,
  data() {
    return {
      msg: {
        type: '',
        txt: '',
      },
      subscription: null,
    }
  },
  created() {
    this.subscription = eventBus.on('user-msg', (msg) => {
      this.msg = msg
      setTimeout(() => (this.msg = { type: '', txt: '' }), 2000)
    })
  },
  unmounted() {
    this.subscription()
  },
}
