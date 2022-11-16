import { bugService } from '../services/bug-service.js'
import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
    <section>
        <h2>{{formTitle}}</h2>
        <form @submit.prevent="save">
            <input type="text" v-model="bugToEdit.title" placeholder="title">
            <input type="text" v-model="bugToEdit.description" placeholder="description">
            <input type="number" v-model="bugToEdit.severity" placeholder="severity">
            <button>Save</button>
        </form>
    </section>
    `,
  components: {},
  data() {
    return {
      bugToEdit: bugService.getEmptyBug(),
    }
  },
  created() {
    const bugId = this.bugId
    if (bugId) {
      bugService.getById(bugId).then((bug) => (this.bugToEdit = bug))
    }
  },
  methods: {
    save() {
      bugService
        .save(this.bugToEdit)
        .then((bug) => {
          this.$router.push('/')
          eventBus.emit('user-msg', {
            type: 'success',
            txt: 'The bug was edit successfully!',
          })
        })
        .catch(() => {
          eventBus.emit('user-msg', {
            type: 'error',
            txt: 'Only the bug owner can edit it!',
          })
        })
    },
  },
  computed: {
    formTitle() {
      return this.bugId ? 'Edit bug' : 'Add bug'
    },
    bugId() {
      return this.$route.params.bugId
    },
  },
  unmounted() {},
}
