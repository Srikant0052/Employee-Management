
require('dotenv').config()
const express = require("express")
const app = express();
const morgan = require('morgan')
const { notFound, errorHandler } = require('./utils/errors')
let port = process.env.PORT || 4000
const employeeRoutes = require("./routes/employeeRoutes")
const worklogRoutes = require('./routes/worklogRoutes')
const cors = require("cors")
require('./db/connect')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use("/", employeeRoutes)
app.use('/', worklogRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, _ => console.log(`Server is running on port ${port}`));
