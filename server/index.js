const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('../routes')

const portfolioRoutes = require('./routes/portfolio')

const authService = require('./services/auth')

const config = require('./config')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

const secretData = [
  {
    title: 'Secret Data 1',
    description: 'Plans how to build spaceship'
  },
  {
    title: 'Secret Data 2',
    description: 'My secret passwords'
  }
]

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
.then(() => {
  console.log('Database connected!')
})
.catch(err => {
  console.error(err)
})

app.prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.json())

    server.use('/api/v1/portfolios', portfolioRoutes)

    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
      return res.json(secretData)
    })

    server.get('/api/v1/onlysiteowner', authService.checkJWT, authService.checkRole('siteOwner'), (req, res) => {
      console.log(req.user)
      return res.json(secretData)
    })

    server.get('*', (req, res) => {
      console.log('---------Serving all of the requests--------------')
      return handle(req, res)
    })

    server.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({title: 'Unauthorized', desc: 'Invalid token!'});
      }
    });

    server.use(handle).listen(3000, (err) => {
      if (err) throw err
      console.log('Ready on 3000')
    })
  })
  .catch((err) => {
    console.error(err.stack)
    process.exit(1)
  })