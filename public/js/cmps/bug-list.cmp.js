import bugPreview from './bug-preview.cmp.js'

export default {
  name: 'bug List',
  props: ['bugs'],
  emits: ['removed'],
  template: `

         <tr v-for="bug in bugs" :key="bug._id" >
            <bug-preview  :bug="bug"></bug-preview> 
            <td class="bug-actions">
              <button @click="removeBug(bug._id)">X</button>
              <button @click="showDetails(bug._id)">details</button>
              <router-link :to="'/edit/'+bug._id">Edit</router-link>
            </td>
         </tr>
   
`,
  components: {
    bugPreview,
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    removeBug(bugId) {
      this.$emit('removed', bugId)
    },
    showDetails(bugId) {
      this.$router.push(`/details/${bugId}`)
    },
  },
  computed: {},
  unmounted() {},
}
