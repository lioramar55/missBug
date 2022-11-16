import { bugService } from '../services/bug-service.js'
import { userService } from '../services/user-service.js'
import bugList from '../cmps/bug-list.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'
import { eventBus } from '../services/event-bus.service.js'
export default {
  template: ` 
  <section>
    <h1 style="text-align:center; font-size:26px; font-weight:500; font-family:Arial;" v-if="user">welcome {{user.nickname}}!</h1>
    <template  v-if="bugs">
    <div  class="filter-container">
        <bug-filter @filtered="setFilter"/>
        <router-link v-if="user?.isAdmin" to="/user/admin">see the users | </router-link>
        <router-link to="/edit">Add a new bug</router-link>
        <button @click="nextPage">Next Page</button>
        <button @click="onLogout">Logout</button>
    </div>
    <table class="bugs-table ">
    <thead >
        <th>id</th>
        <th>title</th>
        <th>description</th>
        <th>severity</th>
        <th>created At</th>
        <th>creator</th>
        <th>actions</th>
    </thead>
    <tbody>
        <bug-list @removed="removeBug" :bugs="bugsForDisplay" ></bug-list>
    </tbody>
    </table>
    </template>
  </section>
    `,
  components: {
    bugList,
    bugFilter,
  },
  data() {
    return {
      pageIdx: 0,
      bugs: null,
      user: null,
      filterBy: null,
      bugsLength: null,
    }
  },
  created() {
    this.loadBugs()
    this.user = userService.getLoggedInUser()
  },
  mounted() {
    if (!this.user) this.$router.push('/login')
    else
      eventBus.emit('user-msg', {
        type: 'success',
        txt: `Welcome back ${this.user.nickname}`,
      })
  },

  methods: {
    removeBug(BugId) {
      bugService.remove(BugId).then((bugs) => (this.bugs = bugs))
    },
    onLogout() {
      userService.logout().then(() => this.$router.push('/login'))
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
      this.loadBugs()
    },
    loadBugs() {
      //with filter bonus and pages, server side filter
      const filterBy = { ...this.filterBy, pageIdx: this.pageIdx }
      bugService.query(filterBy).then((res) => {
        this.bugs = res.bugs
        this.bugsLength = res.bugsLength // can do a func in bugService that return the length
      })
    },
    nextPage() {
      if (this.pageIdx * 3 > this.bugsLength) this.pageIdx = 0
      console.log(this.bugsLength)
      this.pageIdx++
      this.loadBugs()
    },
  },
  computed: {
    bugsForDisplay() {
      return this.bugs
    },
  },
  unmounted() {},
}
