const express = require('express')
const mongoose = require('mongoose')
const employee = require('./routes/employee')
const app = express()

require('dotenv').config()

app.use(require('cors')())

app.use(express.json())
app.use(
    express.urlencoded({
        extended: false,
    }),
)

app.use((req, res, next) => {
    console.log(`${req.method.toUpperCase()} ${req.url}`)
    next()
})

app.use('/employees', employee)

app.use((req, res, next) => {
    const error = new Error('Resource Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        success: false,
        status: error.status,
        error: {
            message: error.message,
        },
    })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        user: process.env.user,
        pass: process.env.pass,
        keepAlive: true,
    })
    .then(() => console.log('App is connected to the database.'))
    .catch(console.log)