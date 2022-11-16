const express = require('express')
const bugService = require('./bug.service')
const userService = require('../user/user.service')

const router = express.Router()

router.get('/', (req, res) => {
  const { pageIdx, title } = req.query
  const filterBy = { title }
  if (pageIdx) filterBy.pageIdx = +pageIdx
  bugService.query(filterBy).then((bugs) => res.json(bugs))
})

//READ
router.get('/:bugId', (req, res) => {
  const { bugId } = req.params
  bugService.getById(bugId).then((bug) => {
    // handle if not found
    if (bug) res.json(bug)
    else res.status(404).send('Bug not found')
  })
})

//CREATE
router.post('', (req, res) => {
  const { loginToken } = req.cookies
  const user = userService.validateToken(loginToken)
  if (!user) return res.status(401).send('Login first')

  // const { loggedinUser } = req.session
  // if (!loggedinUser) return res.status(401).send('Login first')

  const bug = req.body // get the bug from the req body
  bug.creator = {
    nickname: user.nickname, // (OR FROM SESSION)loggedinUser.nickname
    creatorId: user._id, // (OR FROM SESSION)loggedinUser._id,
  }
  bugService.save(bug).then((savedBug) => res.json(savedBug))
})

//UPDATE
router.put('/:id', (req, res) => {
  const { loginToken } = req.cookies
  const user = userService.validateToken(loginToken)
  if (!user) return res.status(401).send('Login first')

  // const { loggedinUser } = req.session
  // if (!loggedinUser) return res.status(401).send('Login first')

  //This is the backend responsibility to determine the user identity
  const bug = req.body
  // bug.creator = { nickname: user.nickname } // (OR FROM SESSION) loggedinUser.nickname

  bugService
    .save(bug, user)
    .then((savedBug) => res.json(savedBug))
    .catch((err) => {
      console.log('Cannot update bug', err)
      res.status(401).send(err)
    })
})

//DELETE
router.delete('/:bugId', (req, res) => {
  // const { loggedinUser } = req.session
  // if (!loggedinUser) return res.status(401).send('Login first')
  const { loginToken } = req.cookies
  const user = userService.validateToken(loginToken)
  if (!user) return res.status(401).send('Login first')

  const { bugId } = req.params
  bugService
    .remove(bugId, user)
    .then((bugs) => res.json(bugs))
    .catch((err) => {
      console.log('Cannot remove bug', err)
      res.status(401).send(err)
    })
})

module.exports = router
