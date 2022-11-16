import { bugService } from '../services/bug-service.js'

export default {
  template: `
  <h1> Details page</h1>
 <section v-if="bug">
 <h1>See the bug details here:</h1>
 <h1>{{bug.title}}</h1>
 <h2>{{bug.description}}</h2>
 <h2>{{bug.severity}}</h2>
 <h2>{{bug.createdAt}}</h2>

 </section>
`,
  data() {
    return {
      bug: null,
    }
  },
  created() {
    console.log('created')
    // this.loadBug(); // opt1 , opt2 is to use the watch for the bug load
  },
  methods: {
    loadBug() {
      if (!this.bugId) return // prevent the run of the watcher when change route
      //opt1
      //   const {bugId} = this.$route.params; // bugId like the name in the routes file :bugId
      bugService.getById(this.bugId).then((bug) => (this.bug = bug)) //opt2 run the bugId computed
    },
  },
  computed: {
    //opt 2 use computed for the bugId
    bugId() {
      return this.$route.params.bugId
    },
  },
  //opt1 use the param specf as the func
  //   watch: {
  //     '$route.params.bugId'(id) {
  //       console.log('Changed to', id);
  //       this.loadBug();
  //     },
  //   },
  //opt 2
  watch: {
    // when the computed bugId run the watch handler also run
    bugId: {
      handler() {
        this.loadBug()
      },
      immediate: true, //to also run the watch on the start / run eagerly
    },
  },
  unmounted() {},
}
