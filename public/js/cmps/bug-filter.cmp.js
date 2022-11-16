export default {
  template: `
 <section>
     <label >
         Search
         <input type="text" @input="setFilter" ref="titleInput" v-model="filterBy.title" placeholder="By Title">
     </label>
 </section>
`,
  data() {
    return {
      filterBy: {
        title: '',
      },
    };
  },
  created() {},
  mounted() {
    this.$refs.titleInput.focus();
  },
  methods: {
    setFilter() {
      this.$emit('filtered', {...this.filterBy});
    },
  },
  computed: {},
  unmounted() {},
};
