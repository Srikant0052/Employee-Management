const workLog = require("../models/workLog");
const createError = require("http-errors");
const empCollection = require("../models/employee");
const projects = require("../models/projects");
const moment = require("moment");
const { isValidRequestBody, isValid } = require("../utils/validator");
const { generateId } = require("../utils/helpers");
let now = moment();

const addTask = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    let { employeeId, projectCode, description, spendTime, status, DM_To } =
      requestBody;

    if (!isValid(employeeId)) {
      throw createError(400, "Employee id is required");
    }

    const isEmployee = await empCollection.findOne({ employeeId: employeeId });

    if (!isEmployee) {
      throw createError(404, `Employee Not Exist`);
    }

    if (!isValid(projectCode)) {
      throw createError(400, "Project Code is required");
    }

    const isProjectExist = await projects.findOne({ projectCode: projectCode });

    if (!isProjectExist) {
      throw createError(404, `Project Not Exist`);
    }

    if (!isValid(description)) {
      throw createError(400, "Description is required");
    }

    if (["Pend", "Comp"].indexOf(status) === -1) {
      return res
        .status(400)
        .send({ status: false, msg: "Please choose vaild status" });
    }

    let taskId = generateId();
    const slNo = (await workLog.find().count()) + 1;

    const startingTime = now.format("lll");

    // if (req.employee != isEmployee.userId) {
    //   throw createError(401, "Unauthorized Access");
    // }

    const worklogAdded = await workLog.create({
      slNo,
      employeeId,
      projectCode,
      taskId,
      description,
      startingTime,
      spendTime,
      status,
      DM_To,
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
    let taskId = req.params.taskId;
    let employeeId = req.params.employeeId;
    const { status, description, spendTime, DM_To } = requestBody;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, "All fields are Mandatory!");
    }
    // let status = req.params.status;
    // let description = req.params.description;
    // let endingTime;

    // if (status === "Completed" || status === "Failed") {
    //   endingTime = now.format("lll");
    // }

    const task = await workLog.findOne({
      taskId: taskId,
      employeeId: employeeId,
    });

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

    if ("DM_To" in requestBody) {
      if (!("$set" in updateData)) {
        updateData["$set"] = {};
      }
      updateData["$set"]["DM_To"] = DM_To;
    }

    const updatedTask = await workLog.findOneAndUpdate(
      { taskId: taskId, employeeId: employeeId },
      updateData,
      { new: true }
    );

    if (updatedTask) {
      res.status(200).send({
        status: true,
        message: `data updated SuccessFully`,
        data: updatedTask,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getTaskList = async (req, res, next) => {
  try {
    const taskList = await workLog
      .find({ isDeleted: false })
      .sort({ slNo: -1 });
    // console.log(taskList);
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
    const task = await workLog
      .find({ employeeId: employeeId, isDeleted: false })
      .sort({ slNo: -1 });

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

const getTaskByProjectCode = async (req, res, next) => {
  try {
    const projectCode = req.params.projectCode;

    const task = await workLog.find({
      projectCode: projectCode,
      isDeleted: false,
    });

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

const getTaskByTaskId = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    const task = await workLog.findOne({ taskId: taskId, isDeleted: false });

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

const deleteTaskByTaskId = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;

    const task = await workLog.findOne({ taskId: taskId, isDeleted: false });

    if (!task) {
      throw createError(404, "Data Not Found");
    }

    const deleteTask = await workLog.findOneAndUpdate(
      { taskId: taskId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );

    return res.status(200).send({
      status: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const taskData = async (req, res, next) => {
  try {
    const task = await workLog
      .aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "employeeId",
            as: "employeeData",
          },
        },
        {
          $unwind: "$employeeData",
        },
        {
          $lookup: {
            from: "projects",
            localField: "projectCode",
            foreignField: "projectCode",
            as: "projectData",
          },
        },
        {
          $unwind: "$projectData",
        },

        {
          $project: {
            _id: 1,
            slNo: 1,
            taskId: 1,
            description: 1,
            startingTime: 1,
            status: 1,
            spendTime: 1,
            DM_To: 1,
            isDeleted: 1,
            deletedAt: 1,
            createdAt:1,
            updatedAt:1,
            ProjectName: "$projectData.name",
            employeeName: "$employeeData.firstName",
          },
        },
      ])
      .sort({ slNo: -1 })
      .limit(3);

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
  getTaskByEmployeeId,
  getTaskByProjectCode,
  getTaskByTaskId,
  deleteTaskByTaskId,
  taskData,
};
