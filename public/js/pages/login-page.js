import { eventBus } from '../services/event-bus.service.js'
import { userService } from '../services/user-service.js'

export default {
  template: `
        <section class="user-info" v-if="user">
            <h2>Welcome {{user?.nickname}}</h2>
            <button @click="logout">Logout</button>
        </section>
        <section>
            <h1>Login page</h1>
          <form @submit.prevent="login">
            <input type="text" v-model="nickname" placeholder="Enter your nickname">
            <input type="password" v-model="password" placeholder="Enter your password">
            <button >Login</button>
          </form>
        </section>
        <section>
            <h1>Signup page</h1>
          <form @submit.prevent="signup">
            <input type="text" v-model="nickname" placeholder="Enter your nickname">
            <input type="password" v-model="password" placeholder="Enter your password">
            <button >Signup</button>
          </form>
        </section>
    `,
  components: {},
  data() {
    return {
      nickname: null,
      password: null,
      user: null,
    }
  },
  created() {
    this.user = userService.getLoggedInUser()
  },
  methods: {
    login() {
      userService
        .login(this.nickname, this.password)
        .then((user) => {
          this.user = user
          this.$router.push('/')
        })
        .catch(() =>
          eventBus.emit('user-msg', {
            type: 'error',
            txt: 'Username or password are wrong',
          })
        )
    },
    signup() {
      userService
        .signup(this.nickname, this.password)
        .then((user) => {
          this.user = user
          this.$router.push('/')
        })
        .catch(() =>
          eventBus.emit('user-msg', {
            type: 'error',
            txt: 'An error occured',
          })
        )
    },
    logout() {
      userService
        .logout()
        .then(() => {
          this.user = null
          eventBus.emit('user-msg', {
            type: 'success',
            txt: 'Logged out successfuly',
          })
        })
        .catch(() =>
          eventBus.emit('user-msg', {
            type: 'error',
            txt: 'An error occured',
          })
        )
    },
  },
  computed: {},
  unmounted() {},
}
