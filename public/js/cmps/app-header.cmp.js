export default {
  template: `
 <header class="app-header">
       <div class="logo">
           <p>Miss Bugs</p>
       </div>
       <nav class="nav-links">
           <router-link to="/">bugs App</router-link> |
           <router-link to="/login">Login</router-link> |
           <router-link to="/user">Profile</router-link>
       </nav>
    </header>
`,
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  unmounted() {},
}
