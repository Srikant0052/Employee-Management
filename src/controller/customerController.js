const custCollection = require("../models/customer");
const empCollection = require("../models/employee");
const { isValidRequestBody, isValid } = require("../utils/validator");
const createError = require("http-errors");
const { generateId } = require("../utils/helpers");

const addCustomer = async (req, res, next) => {
  try {
    if (!isValidRequestBody(req.body)) {
      throw createError(400, `invalid request Parameters`);
    }

    let { name, address, employeeId } = req.body;

    const isEmployee = await empCollection.findOne({
      employeeId: employeeId,
      isDeleted: false,
    });

    if (req.employee != isEmployee._id && req.employeeRole != isEmployee.role) {
      throw createError(401, "Unauthorized Access");
    }

    if (!isValid(name)) {
      throw createError(400, `Name should not be empty`);
    }

    let slNo = (await custCollection.find().count()) + 1;
    const customerId = generateId();

    const customerAdded = await custCollection.create({
      slNo,
      name,
      address,
      customerId,
    });

    return res.status(201).send({
      status: true,
      data: customerAdded,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomer = async (req, res, next) => {
  try {
    const customerList = await custCollection
      .find({ isDeleted: false })
      .sort({ slNo: -1 });
    // console.log(taskList);
    if (!customerList) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: customerList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addCustomer, getAllCustomer };
