import { userService } from '../services/user-service.js'

export default {
  name: 'bug List',
  emits: ['removed'],
  template: `
         <div v-if="users" v-for="user in users" :key="user._id" >
            <h2>{{user.nickname}}</h2>
           <p>score: {{user.score}}</p>
            <div class="btns-container">
                <button @click="remove(user._id)" >X</button>
            </div>
        </div>
`,
  components: {},
  data() {
    return {
      users: null,
    }
  },
  created() {
    this.loadUsers()
  },
  methods: {
    remove(userId) {
      userService.remove(userId).then((users) => (this.users = users))
    },
    loadUsers() {
      userService.query().then((users) => (this.users = users))
    },
  },
  computed: {},
  unmounted() {},
}
