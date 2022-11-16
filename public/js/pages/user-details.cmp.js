import { userService } from '../services/user-service.js'
import { bugService } from '../services/bug-service.js'

export default {
  template: `
  <h1> User profile</h1>
 <section v-if="user">
 <h1>See the user details here:</h1>
 <h1>{{user.nickname}}</h1>
 <h2>{{user.score}}</h2>
 <h3>{{bugsCount}}</h3>
 </section>
`,
  data() {
    return {
      user: userService.getLoggedInUser(),
      bugsCount: 0,
    }
  },
  created() {
    if (this.user) this.countBugs()
  },
  methods: {
    countBugs() {
      bugService.query({ title: 'ALL' }).then((res) => {
        const userBugs = res.bugs.filter(
          (bug) => bug.creator.nickname === this.user.nickname
        )
        this.bugsCount = userBugs.length
      })
    },
    loadUser() {
      if (!this.userId) return
      userService.getById(this.userId).then((user) => (this.user = user))
    },
  },
  computed: {
    userId() {
      return this.$route.params.userId
    },
  },
  watch: {
    // when the computed userId run the watch handler also run
    userId: {
      handler() {
        this.loadUser()
      },
      immediate: true, //to also run the watch on the start / run eagerly
    },
  },
  unmounted() {},
}
