const { Router } = require('express')
const { addTask, updateTask } = require('../controller/workLogController')
const router = Router()

router
    .post('/addTask', addTask)
    .put('/updateTask/:empCode/:status', updateTask)

module.exports = router

