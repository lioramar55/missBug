const bug_URL = '/api/bug/';

export const bugService = {
  query,
  remove,
  getById,
  save,
  getEmptyBug,
};

function query(filterBy = {}) {
  //with filter , send it on the req query
  return axios.get(bug_URL, {params: filterBy}).then((res) => res.data);
}

function getById(bugId) {
  return axios.get(bug_URL + `${bugId}`).then((res) => res.data);
}

function remove(bugId) {
  return axios.delete(bug_URL + `${bugId}`).then((res) => res.data);
}

function save(bug) {
  if (bug._id) {
    return axios.put(bug_URL + `${bug._id}`, bug).then((res) => res.data);
  } else {
    return axios.post(bug_URL, bug).then((res) => res.data);
  }
}

// Factory Method:
function getEmptyBug() {
  return {
    _id: '',
    title: '',
    description: '',
    severity: 0,
    createdAt: new Date(),
  };
}
