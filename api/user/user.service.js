const fs = require('fs')
const gUsers = require('../../data/user.json')

// To encrypt user pasword and compare
const bcrypt = require('bcryptjs')
const saltRounds = 10

// For user login token
const Cryptr = require('cryptr')
const TOKEN_KEY = process.env.TOKEN_KEY || 'myTotallySecretKey'
const cryptr = new Cryptr(TOKEN_KEY)

function getLoginToken(user) {
  return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken)
    const loggedinUser = JSON.parse(json)
    return loggedinUser
  } catch (err) {
    console.log('Invalid login token')
  }
  return null
}

// With password hashing and encrypting

function checkLogin(nickname, password) {
  const user = gUsers.find((user) => user.nickname === nickname)
  if (!user) return Promise.reject('no such user')

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) reject('An error occurred')
      if (result) {
        //remove the password before sending it to the front
        const noPassUser = { ...user } // its a refernce to the user in the gUsers, soo do shallow
        delete noPassUser.password
        resolve(noPassUser)
      } else {
        reject('Incorrect password')
      }
    })
  })
}

function signup(nickname, password) {
  const isUserExist = gUsers.find((user) => user.nickname === nickname)
  if (isUserExist) return Promise.reject('Nickname already exists')

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err)
      const user = {
        _id: _makeId(),
        nickname,
        password: hash,
        isAdmin: false,
        score: 100,
      }
      gUsers.push(user)
      const noPassUser = { ...user } // its a refernce to the user in the gUsers, soo do shallow
      delete noPassUser.password
      _saveUsersToFile().then(() => resolve(noPassUser))
    })
  })
}

//  Without password hashing

// function checkLogin(nickname, password) {
//   const user = gUsers.find(
//     (user) => user.nickname === nickname && user.password === password
//   )
//   if (!user) return Promise.reject()
//   //remove the password before sending it to the front
//   const noPassUser = { ...user } // its a refernce to the user in the gUsers, soo do shallow
//   delete noPassUser.password
//   return Promise.resolve(noPassUser)
// }

// function signup(nickname, password) {
//   const user = {
//     _id: _makeId(),
//     nickname,
//     password,
//     isAdmin: false,
//     score: 100,
//   }
//   gUsers.push(user)
//   const noPassUser = { ...user } // its a refernce to the user in the gUsers, soo do shallow
//   delete noPassUser.password
//   return _saveUsersToFile().then(() => noPassUser)
// }

function query(filterBy = {}) {
  return Promise.resolve(gUsers)
}

function getById(userId) {
  return Promise.resolve(gUsers.find((user) => user._id === userId))
}

function remove(userId, user) {
  const idx = gUsers.findIndex((user) => user._id === userId)
  if (user.isAdmin) {
    gUsers.splice(idx, 1)
    return _saveUsersToFile().then(() => gUsers)
  }
  return Promise.reject('Not an admin')
}

module.exports = {
  query,
  getById,
  checkLogin,
  signup,
  remove,
  getLoginToken,
  validateToken,
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

function _saveUsersToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
