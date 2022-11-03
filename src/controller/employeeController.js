const createError = require("http-errors");
const empCollection = require("../models/employee");
const { isValid, isValidRequestBody } = require("../utils/validator");
const jwt = require("jsonwebtoken");
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

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
      mobile,
      dateOfJoining,
      password,
      role,
      address,
    } = requestBody;

    if (!isValid(employeeId)) {
      throw createError(400, `Please Enter employee Id`);
    }

    const isemployeeIdExist = await empCollection.findOne({
      employeeId: employeeId,
      email: email,
      isDeleted: false,
    });

    if (isemployeeIdExist) {
      throw createError(400, `This EmployeeId or Email is Already In Use`);
    }

    if (!isValid(firstName)) {
      throw createError(400, `Please Enter firstName`);
    }

    if (!userName || !isValid(userName)) {
      throw createError(400, `Please Enter useranme`);
    }

    const isUserNameExist = await empCollection.findOne({ userName: userName });

    if (isUserNameExist) {
      throw createError(409, `Username already exist`);
    }

    if (!isValid(password)) {
      throw createError(400, `Please Enter Password`);
    }

    if (!passRegex.test(password)) {
      throw createError(400, `Please Enter a valid Password`);
    }
    
    if (!isValid(designation)) {
      throw createError(400, `Please Enter Designation`);
    }
    if (!isValid(mobile)) {
      throw createError(400, `Please Enter Mobile No.`);
    }

    if (!phoneRegex.test(mobile)) {
      throw createError(400, `Please Enter a valid Mobile No.`);
    }

    if (!isValid(role)) {
      throw createError(400, `Please Enter Role`);
    }
    if (["Employee", "Admin"].indexOf(role) === -1) {
      throw createError(400, "Please choose a vaild Role");
    }
    // const employeeExists = await empCollection.findOne({
    //   employeeId: employeeId,
    // });

    // if (employeeExists) {
    //   throw createError(400, `Employee already registerd`);
    // }

    let slNo = (await empCollection.find().count()) + 1;

    const employeeData = {
      slNo,
      employeeId,
      firstName,
      lastName,
      userName,
      password,
      role,
      mobile,
      designation,
      email,
      address,
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

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      "Employee123",
      { expiresIn: 60 * 60 }
    );
    // res.setHeader("Authorization", token);
    res.cookie(`token`, token);

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
    const employeeList = await empCollection.find().sort({ dateOfJoining: 1 });

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

    const employee = await empCollection.findOne({ employeeId: employeeId });

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

const updatePassword = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }
    const { email, oldPassword, newPassword } = requestBody;

    if (!isValid(email)) {
      throw createError(400, `Please Enter Email`);
    }

    if (!isValid(oldPassword)) {
      throw createError(400, `Please Enter Old Password`);
    }

    if (!isValid(newPassword)) {
      throw createError(400, `Please Enter New Password`);
    }

    const employee = await empCollection
      .findOne({ email: email, password: oldPassword })
      .lean();

    if (!employee) {
      throw createError(404, "Data Not Found");
    }

    const updatedPassword = await empCollection.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Password Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployee,
  getEmployeeList,
  employeeLogin,
  getEmployeeByEmployeeId,
  updatePassword,
};
