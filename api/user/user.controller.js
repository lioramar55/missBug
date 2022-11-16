const express = require('express')
const userService = require('./user.service')

const router = express.Router()

// Authentication

// Auth routes

//LOGIN
router.post('/login', (req, res) => {
  const { nickname, password } = req.body
  userService
    .checkLogin(nickname, password)
    .then((user) => {
      const loginToken = userService.getLoginToken(user)
      res.cookie('loginToken', loginToken)
      // req.session.loggedinUser = user
      res.send(user)
    })
    .catch((err) => res.status(401).send('Invalid User/Password'))
})

//SIGNUP
router.post('/signup', (req, res) => {
  const { nickname, password } = req.body
  userService
    .signup(nickname, password)
    .then((user) => {
      const loginToken = userService.getLoginToken(user)
      res.cookie('loginToken', loginToken)
      // req.session.loggedinUser = user
      res.send(user)
    })
    .catch((err) => res.status(401).send('User with the same nickname exists'))
})

//LOGOUT
router.get('/logout', (req, res) => {
  res.clearCookie('loginToken')
  // req.session.destroy()
  res.end()
})

// user LIST
router.get('/', (req, res) => {
  userService.query().then((users) => res.json(users))
})

//DELETE user
router.delete('/:userId', (req, res) => {
  const { loggedinUser } = req.session
  if (!loggedinUser) return res.status(401).send('Login first')
  const { userId } = req.params
  userService
    .remove(userId, loggedinUser)
    .then((users) => res.json(users))
    .catch((err) => {
      console.log('Cannot remove user', err)
      res.status(401).send(err)
    })
})

//READ
router.get('/:userId', (req, res) => {
  const { userId } = req.params // params is an obj with the id in it
  userService.getById(userId).then((user) => {
    // handle if not found
    if (user) res.json(user)
    //can also use res.send
    else res.status(404).send('User not found')
  })
})

module.exports = router
