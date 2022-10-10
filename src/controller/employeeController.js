const createError = require("http-errors");
const empCollection = require("../models/employee");
const { isValid, isValidRequestBody } = require("../utils/validator");

const addEmployee = async (req, res, next) => {

  try {
    const requestBody = req.body

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`)
    }

    const { employeeId, firstName, lastName, userName, designation, dateOfJoining, password, email } = requestBody

    if (!isValid(employeeId)) {
      throw createError(400, `Please Enter employee Id`)
    }

    const isemployeeIdExist = await empCollection.findOne({ employeeId })

    if (isemployeeIdExist) {
      throw createError(40, `Employee id ${employeeId} is Already In Use`)
    }

    if (!isValid(firstName)) {
      throw createError(400, `Please Enter a valid firstName`)
    }

    if (!isValid(lastName)) {
      throw createError(400, `Please Enter a Valid lastname`)
    }

    if (!isValid(email)) {
      throw createError(400, `Please Enter a Valid email`)
    }

    if (!userName || !isValid(userName)) {
      throw createError(400, `Please Enter a valid userName`)
    }

    const isUserNameExist = await empCollection.findOne({ userName })

    if (isUserNameExist) {
      throw createError(409, `username already exist`)
    }

    const isMailExist = await empCollection.findOne({ email })
    if (isMailExist) {
      throw createError(409, `Email is Already In use`)
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`)
    }

    if (!isValid(designation)) {
      throw createError(400, `Please Enter Designation`)
    }

    const employeeData = {

      employeeId,
      firstName,
      lastName,
      userName,
      password,
      designation,
      email,
      dateOfJoining: dateOfJoining || null

    }

    const empAdded = await empCollection.create(employeeData);

    return res.status(201).send({
      
      status: true,
      message: "Employee Added Successfully",
      data: empAdded,

    })

  } catch (error) {
    next(error)
  }

}


const getEmployeeList = async (req, res, next) => {

  try {

    const employeeList = await empCollection.find()

    if (!employeeList) {
      throw createError(400, 'Data Not Found')
    }

    return res.status(200).send({

      status: true,
      message: "Success",
      data: employeeList

    })


  } catch (error) {
    next(error)
  }
}

module.exports = { addEmployee, getEmployeeList };
