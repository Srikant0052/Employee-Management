const createError = require('http-errors')
const projectColl = require('../models/projects')
const { isValidRequestBody } = require('../utils/validator')



const addProject = async (req, res, next) => {
    try {

        if (!isValidRequestBody(req.body)) {
            throw createError(400, `invalid request params`)
        }

        let { projectCode, name, description, customerId } = req.body

        if (!isValidRequestBody(req.body)) {
            throw createError(400, `invalid request params`)
        }

        if (!isValid(projectCode)) {
            throw createError(400, `Please Enter A Valid Project Code`)
        }

        if (!isValid(name)) {
            throw createError(400, `Please Enter A Valid Project name`)
        }

        if (!isValid(description)) {
            throw createError(400, `Please Enter A Valid Project description`)
        }


    } catch (error) {
        next(error)
    }
}