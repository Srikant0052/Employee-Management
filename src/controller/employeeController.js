const createError = require("http-errors");
const empCollection = require("../models/employee");
const { isValid, isValidRequestBody } = require("../utils/validator");

const addEmployee = async (req, res, next) => {

  try {
    const requestBody = req.body

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`)
    }

    const { empCode, firstName, lastName, userName, designation, dateOfJoining, password } = requestBody

    if (!isValid(empCode)) {
      throw createError(400, `Please Enter employee Id`)
    }

    const isEmpCodeExist = await empCollection.findOne({ empCode })

    if (isEmpCodeExist) {
      throw createError(400, `This Employee id is Already In Use`)
    }

    if (!isValid(firstName)) {
      throw createError(400, `Please Enter firstName`)
    }

    if (!isValid(lastName)) {
      throw createError(400, `Please Enter lastname`)
    }

    if (!userName || !isValid(userName)) {
      throw createError(400, `Please Enter useranme`)
    }

    const isUserNameExist = await empCollection.findOne({ userName })

    if (isUserNameExist) {
      throw createError(409, `username already exist`)
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`)
    }

    if (!isValid(designation)) {
      throw createError(400, `Please Enter Designation`)
    }

    const employeeExists = await empCollection.findOne({ empCode: empCode });

    if (employeeExists) {
      throw createError(400, `Employee already registerd`)
    }

    const employeeData = {

      empCode,
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
