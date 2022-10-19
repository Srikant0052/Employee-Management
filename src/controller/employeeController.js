const createError = require("http-errors");
const empCollection = require("../models/employee");
const { isValid, isValidRequestBody } = require("../utils/validator");
const jwt = require("jsonwebtoken");

const addEmployee = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    const {
      employeeId,
      firstName,
      lastName,
      email,
      userName,
      designation,
      dateOfJoining,
      password,
    } = requestBody;

    if (!isValid(employeeId)) {
      throw createError(400, `Please Enter employee Id`);
    }

    const isemployeeIdExist = await empCollection.findOne({ employeeId });

    if (isemployeeIdExist) {
      throw createError(400, `This Employee id is Already In Use`);
    }

    if (!isValid(firstName)) {
      throw createError(400, `Please Enter firstName`);
    }

    // if (!isValid(lastName)) {
    //   throw createError(400, `Please Enter lastname`)
    // }

    if (!userName || !isValid(userName)) {
      throw createError(400, `Please Enter useranme`);
    }

    const isUserNameExist = await empCollection.findOne({ userName });

    if (isUserNameExist) {
      throw createError(409, `username already exist`);
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`);
    }

    if (!isValid(designation)) {
      throw createError(400, `Please Enter Designation`);
    }

    const employeeExists = await empCollection.findOne({
      employeeId: employeeId,
    });

    if (employeeExists) {
      throw createError(400, `Employee already registerd`);
    }

    const employeeData = {
      employeeId,
      firstName,
      lastName,
      userName,
      password,
      designation,
      email,
      dateOfJoining: dateOfJoining || null,
    };

    const empAdded = await empCollection.create(employeeData);

    return res.status(201).send({
      status: true,
      message: "Employee Added Successfully",
      data: empAdded,
    });
  } catch (error) {
    next(error);
  }
};

const employeeLogin = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    const { email, password } = requestBody;

    if (!isValid(email)) {
      throw createError(400, `Please Enter Email`);
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`);
    }

    const user = await empCollection
      .findOne({
        email: email,
        password: password,
      })
      .lean();

    if (!user) {
      throw createError(401, `Email or Password is Incorrect!`);
    }
    // localStorage.setItem("UserName" ,user)

    const token = jwt.sign(
      {
        userId: user._id,
      },
      "Employee123"
      // { expiresIn: 60 * 60 }
    );
    res.setHeader("Authorization", token);

    return res.status(200).send({
      status: true,
      message: "Login Successfully",
      token: token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeList = async (req, res, next) => {
  try {
    const employeeList = await empCollection.find();

    if (!employeeList) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: employeeList,
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeByEmployeeId = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;

    const employee = await empCollection.findOne({employeeId:employeeId});

    if (!employee) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployee,
  getEmployeeList,
  employeeLogin,
  getEmployeeByEmployeeId,
};
