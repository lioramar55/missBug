const fs = require('fs')
const gBugs = require('../../data/bug.json') // get the data as json, the bugs
const PAGE_SIZE = 3

module.exports = {
  query,
  getById,
  save,
  remove,
}

function query(filterBy = { title: '', pageIdx: 0 }) {
  if (filterBy.pageIdx * PAGE_SIZE > gBugs.length) filterBy.pageIdx = 0
  if (filterBy.title === 'ALL')
    return Promise.resolve({ bugs: gBugs, bugsLength: gBugs.length })
  const regex = new RegExp(filterBy.title, 'i') //insenstive for capital letter
  let bugs = gBugs.filter((bug) => regex.test(bug.title))

  const startIdx = filterBy.pageIdx * PAGE_SIZE
  bugs = bugs.slice(startIdx, startIdx + PAGE_SIZE)

  return Promise.resolve({ bugs, bugsLength: gBugs.length })
}

function getById(bugId) {
  return Promise.resolve(gBugs.find((bug) => bug._id === bugId))
}

function save(bug, user = null) {
  if (bug._id) {
    // update a bug
    if (user?.isAdmin || user?.nickname === bug.creator.nickname) {
      const idx = gBugs.findIndex((currBug) => currBug._id === bug._id)
      const { title, description, severity } = bug
      gBugs[idx] = {
        ...gBugs[idx],
        title,
        description,
        severity,
        updatedAt: Date.now(),
      }
      return _saveBugsToFile().then(() => gBugs[idx])
    }
    return Promise.reject('not your bug')
  }
  //add new bug
  bug._id = _makeId()
  bug.createdAt = Date.now()
  gBugs.unshift(bug)
  return _saveBugsToFile().then(() => bug) // save the updated bugs in the json file
}

function remove(bugId, user) {
  const idx = gBugs.findIndex((bug) => bug._id === bugId)
  if (user.isAdmin || gBugs[idx].creator.nickname === user.nickname) {
    gBugs.splice(idx, 1)
    return _saveBugsToFile().then(() => gBugs)
  }
  return Promise.reject('Not your bug')
}

function _makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function _saveBugsToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/bug.json', JSON.stringify(gBugs, null, 2), (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
