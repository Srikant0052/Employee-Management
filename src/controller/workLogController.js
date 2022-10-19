const workLog = require("../models/workLog");
const createError = require("http-errors");
const empCollection = require("../models/employee");
const projects = require("../models/projects");
const moment = require("moment");
const { isValidRequestBody } = require("../utils/validator");
let now = moment();

const addTask = async (req, res, next) => {
  try {
    let { employeeId, projectCode, description, endingTime } = req.body;

    if (!employeeId) {
      throw createError(400, "Employee id is required");
    }

    const isEmployee = await empCollection.findOne({ employeeId: employeeId });

    if (!isEmployee) {
      throw createError(404, `Employee Not Exist`);
    }

    if (!projectCode) {
      throw createError(400, "Employee id is required");
    }

    // const isProjectExist = await projects.findOne({ projectCode: projectCode });

    // if (!isProjectExist) {
    //   throw createError(404, `project Not Exist`);
    // }

    if (!description) {
      throw createError(400, "Employee id is required");
    }

    const slNo = (await workLog.find().count()) + 1;

    const startingTime = now.format("lll");

    const worklogAdded = await workLog.create({
      ...req.body,
      slNo,
      startingTime,
      endingTime,
    });
    return res.status(201).send({
      status: true,
      data: worklogAdded,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const requestBody = req.body;
    let projectCode = req.params.projectCode;
    const { status, description, spendTime } = requestBody;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, "All fields are Mandatory!");
    }
    // let status = req.params.status;
    // let description = req.params.description;
    // let endingTime;

    // if (status === "Completed" || status === "Failed") {
    //   endingTime = now.format("lll");
    // }

    const task = await workLog.findOne({ projectCode: projectCode });

    if (!task) {
      throw createError(404, "Data Not Found!");
    }

    const updateData = {};

    if ("status" in requestBody) {
      if (!("$set" in updateData)) {
        updateData["$set"] = {};
      }
      updateData["$set"]["status"] = status;
    }

    if ("description" in requestBody) {
      if (!("$set" in updateData)) {
        updateData["$set"] = {};
      }
      updateData["$set"]["description"] = description;
    }

    if ("spendTime" in requestBody) {
      if (!("$set" in updateData)) {
        updateData["$set"] = {};
      }
      updateData["$set"]["spendTime"] = spendTime;
    }

    const updatedWork = await workLog.findOneAndUpdate(
      { projectCode: projectCode },
      updateData,
      { new: true }
    );

    if (updatedWork) {
      res.status(200).send({
        status: true,
        message: `data updated SuccessFully`,
        data: updatedWork,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getTaskList = async (req, res, next) => {
  try {
    const taskList = await workLog.find(); //.populate("employeeId");
    console.log(taskList);
    if (!taskList) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: taskList,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskByEmployeeId = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;

    const task = await workLog.find({ employeeId: employeeId });

    if (!task) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTask,
  updateTask,
  getTaskList,
  getTaskByEmployeeId
};
