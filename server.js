const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')

const app = express()
const port = process.env.PORT || 3030

const bugRoutes = require('./api/bug/bug.controller')
const userRoutes = require('./api/user/user.controller')

//Express App Config
app.use(express.static('public')) //too serves the front / static files to the server, soo the server could access them
app.use(cookieParser()) // for the cookie use
app.use(express.json()) //important soo the server could handle json
//for the session
app.use(
  session({
    secret: 'some secret token',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
)

// Bug Routes
app.use('/api/bug', bugRoutes)

//user routes
app.use('/api/user', userRoutes)

// Fallback route to serve the index.html for any route that was not matched. (e.g: localhost:3000/baba)
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
