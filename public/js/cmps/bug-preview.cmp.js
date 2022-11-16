export default {
  props: ['bug'],
  template: `
 <td>{{bug._id}}</td>
 <td>{{bug.title}}</td>
 <td>{{bug.description}}</td>
 <td>{{bug.severity}}</td>
 <td>{{bug.createdAt}}</td>
 <!-- bug.creator.creatorId added creatorId on the bug for the watcher move on the id route -->
 <!-- can do a diff approach if needed like getUserbyName with the creator name then display the user profile -->
 <td> creator: <router-link :to="'/user/'+bug.creator.creatorId">{{bug.creator.nickname}}</router-link></td>
`,
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
};
