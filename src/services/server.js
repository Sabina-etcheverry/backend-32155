const express = require('express')
const mainRouter = require('../routes/index')
const { checkErrors } = require('../middlewares/checkErrors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', checkErrors, mainRouter)

module.exports = app;