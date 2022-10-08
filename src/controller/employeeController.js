const empModel = require("../models/employeeModel");
const { isValid, isValidRequestBody } = require("../utils/validator");

const addEmployee = async (req, res) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "All fields are Mandatory!" });
    }

    const { employeeId, firstName, lastName, designation, email, date } =
      requestBody;

    if (!isValid(employeeId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter employeeId " });
    }

    if (!isValid(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter firstName " });
    }

    if (!isValid(designation)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter Designation " });
    }
    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter email " });
    }

    const employeeExists = await empModel.findOne({ employeeId: employeeId });

    if (employeeExists) {
      return res.status(400).send({
        status: false,
        message: "EmployeeId  Already registered",
      });
    }

    const employeeEmail = await empModel.findOne({ email: email });

    if (employeeEmail) {
      return res.status(400).send({
        status: false,
        message: "Email  Already registered",
      });
    }

    const employeeData = {
      employeeId,
      firstName,
      lastName,
      designation,
      email,
      dateOfJoining: date,
    };

    const empAdded = await empModel.create(employeeData);

    return res.status(201).send({
      status: true,
      message: "Employee Added Successfully",
      data: empAdded,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getGmployeeList = async (req, res) => {
  try {
    const requestBody = req.body;

    const employeeList = await empModel.find();

    if (!employeeList) {
      return res.status(400).send({ status: false, message: "Data Not Found" });
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: employeeList });
      
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { addEmployee, getGmployeeList };
