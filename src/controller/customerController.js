const custCollection = require('../models/customer')
const { isValidRequestBody, isValid } = require('../utils/validator')
const createError = require('http-errors')
const { generateId } = require('../utils/helpers')



const addCustomer = async (req, res, next) => {

    try {

        if (!isValidRequestBody(req.body)) {
            throw createError(404, `invalid request Parameters`)
        }

        let { name } = req.body

        if (!isValid(name)) {
            throw createError(400, `name should not be empty`)
        }

        let slNo = await custCollection.find().count() + 1
        const customerId = generateId()

        const customerAdded = await custCollection.create({
            slNo,
            name,
            customerId
        })

        return res.status(201).send({
            status: true,
            data: customerAdded
        })


    } catch (error) {
        next(error)
    }

}

module.exports = {
    addCustomer
}