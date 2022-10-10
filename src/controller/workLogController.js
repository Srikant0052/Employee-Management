const workLog = require('../models/workLog')
const createError = require("http-errors");
const empCollection = require("../models/employee");
const projects = require('../models/employee')
const moment = require('moment')
let now = moment()


const addTask = async (req, res, next) => {

    try {

        let { empCode, projectCode, description } = req.body

        if (!empCode) {
            throw createError(400, 'Employee id is required')
        }

        const isEmployee = await empCollection.findOne({ empCode: empCode })

        if (!isEmployee) {
            throw createError(404, `Employee Not Exist`)
        }

        if (!projectCode) {
            throw createError(400, 'Employee id is required')
        }

        const isProjectExist = await projects.findOne({ projectCode: projectCode })

        if (!isProjectExist) {
            throw createError(404, `project Not Exist`)
        }

        if (!description) {
            throw createError(400, 'Employee id is required')
        }

        const slNo = await workLog.find().count() + 1

        const startingTime = now.format('lll')

        const worklogAdded = await workLog.create({ ...req.body, slNo, startingTime })
        return res.status(201).send({
            status: true,
            data: worklogAdded
        })

    } catch (error) {
        next(error)
    }

}

const updateTask = async (req, res, next) => {

    try {

        let empCode = req.params.empCode
        let status = req.params.status
        let endingTime;

        if (status === 'Completed' || status === 'Failed') {
            endingTime = now.format('lll')
        }

        const updatedWork = workLog.findOneAndUpdate({ empCode: empCode }, { status: status, endingTime: endingTime }, { new: true })

        if (updatedWork) {

            res.status(200).send({
                status: true,
                message: `data updated SuccessFully`
            })

        }

    } catch (error) {
        next(error)
    }

}

module.exports = {

    addTask,
    updateTask

}