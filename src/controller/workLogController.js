const workLog = require('../models/workLog')
const createError = require("http-errors");
const empCollection = require("../models/employee");
const projects = require('../models/projects')
const moment = require('moment')
let now = moment()


const addTask = async (req, res, next) => {

    try {

        let { empId, projectCode, description } = req.body

        if (!empId) {
            throw createError(400, 'Employee id is required')
        }

        const isEmployee = await empCollection.findOne({ empId: empId })

        if (!isEmployee) {
            throw createError(404, `Employee Not Exist`)
        }

        console.log(projectCode)

        if (!projectCode) {
            throw createError(400, 'projectCode is required')
        }

        // const isProjectExist = await projects.findOne({ projectCode })

        // console.log(isProjectExist)

        // if (!isProjectExist) {
        //     throw createError(404, `project with the given code does Not Exist`)
        // }

        if (!description) {
            throw createError(400, 'Employee id is required')
        }

        const slNo = await workLog.find().count() + 1
        const startingTime = now.format('YYYY-MM-DD hh:mm:ss')
        let worklogAdded = await workLog.create({ ...req.body, slNo, startingTime })

        worklogAdded = worklogAdded.toObject()

        delete worklogAdded['createdAt']
        delete worklogAdded['updatedAt']
        delete worklogAdded['__v']

        worklogAdded['startingTime'] = moment(startingTime).format('DD MMM hh:mm:ss')

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

        let id = req.params['id']
        let empId = req.params.empId
        let status = req.params.status
        let endingTime;

        if (!id) {
            throw createError(400, `please provide id in path params`)
        }

        if (!empId) {
            throw createError(400, `please employeeId in path params`)
        }

        if (!status) {
            throw createError(400, `please provide status in path params`)
        }

        if (status === 'Completed' || status === 'Failed') {
            endingTime = now.format('YYYY-MM-DD hh:mm:ss')
        }

        const isTask = await workLog.findById(id).lean()

        if (!isTask) {
            throw createError(404, `task does not exist`)
        }

        let startingTime = isTask['startingTime']
        startingTime = moment(startingTime)
        endingTime = moment(endingTime)

        let spendTime = endingTime.diff(startingTime, 'minutes')

        function getTimeFromMins(mins) {

            let hours = Math.trunc(mins / 60)
            let minutes = mins % 60
            return hours + ' hr ' + minutes + ' min '

        }

        console.log(getTimeFromMins(spendTime))

        if (isTask['empId'] != empId) {
            throw createError(401, `Task Does Not Belongs To You`)
        }

        const updatedWork = workLog.findByIdAndUpdate(id, {

            status,
            endingTime,
            spendTime
            
        }, { new: true })

        if (updatedWork) {

            res.status(200).send({
                status: true,
                message: `data updated SuccessFully`,
                data: updatedWork
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