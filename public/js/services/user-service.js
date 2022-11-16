const base_URL = '/api/user/'
const STORAGE_KEY = 'loggedUser'
// let gUser = null;

export const userService = {
  login,
  logout,
  signup,
  getLoggedInUser,
  query,
  remove,
  getById,
}

function query(filterBy = {}) {
  return axios.get(base_URL).then((res) => res.data)
}

function getById(userId) {
  return axios.get(base_URL + `${userId}`).then((res) => res.data)
}

function remove(userId) {
  return axios.delete(base_URL + `${userId}`).then((res) => res.data)
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
}

function login(nickname, password) {
  return axios
    .post(base_URL + 'login', { nickname, password }) //send the user as param on the req
    .then((res) => res.data)
    .then((user) => {
      console.log('login', user)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)) // saved the user without the password
      return user
    })
}

function signup(nickname, password) {
  return axios
    .post(base_URL + 'signup', { nickname, password }) //send the user as param on the req
    .then((res) => res.data)
    .then((user) => {
      console.log('New user:', user)
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user)) // save it in session storage
      return user
    })
}

function logout() {
  return axios.get(base_URL + '/logout').then(() => {
    console.log('logout')
    sessionStorage.removeItem(STORAGE_KEY) // remove the user from the sessionStorage
  })
}
