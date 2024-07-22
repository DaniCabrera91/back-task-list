const express = require('express')
const app = express()

require('dotenv').config()


const PORT = process.env.PORT || 3001

const { dbConnection } = require('./config/config')


app.use(express.json())

dbConnection()
app.use('/tasks', require('./routes/tasks'))


app.listen(PORT, () => console.log(`Server started at port ${PORT}`))