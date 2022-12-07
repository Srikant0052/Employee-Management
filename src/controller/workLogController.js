const workLog = require("../models/workLog");
const createError = require("http-errors");
const empCollection = require("../models/employee");
const projects = require("../models/projects");
const moment = require("moment");
const { isValidRequestBody, isValid } = require("../utils/validator");
const { generateId } = require("../utils/helpers");
const nodemailer = require("nodemailer");
let now = moment();

const addTask = async (req, res, next) => {
  try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `All fields are Mandatory!`);
    }

    let {
      employeeId,
      projectCode,
      description,
      spendTime,
      status,
      DM_To,
      date,
      toMail,
    } = requestBody;

    if (!isValid(employeeId)) {
      throw createError(400, "Employee id is required");
    }

    const isEmployee = await empCollection.findOne({
      employeeId: employeeId,
      isDeleted: false,
    });

    if (!isEmployee) {
      throw createError(404, `Employee Not Exist`);
    }

    if (!isValid(projectCode)) {
      throw createError(400, "Project Code is required");
    }

    const isProjectExist = await projects.findOne({
      projectCode: projectCode,
      isDeleted: false,
    });

    if (!isProjectExist) {
      throw createError(404, `Project Not Exist`);
    }

    if (!isValid(description)) {
      throw createError(400, "Description is required");
    }

    if (["Pend", "Comp"].indexOf(status) === -1) {
      throw createError(400, "Please choose vaild status");
    }

    let taskId = generateId();
    const slNo = (await workLog.find().count()) + 1;

    // let options = {
    //     timeZone: "Asia/Calcutta",
    //     year: "numeric",
    //     month: "numeric",
    //     day: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //   },
    //   formatter = new Intl.DateTimeFormat([], options);

    let startingTime = new Date(date);
    
    startingTime = startingTime.toLocaleString("en-US", {
      // weekday: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

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

    if (toMail != "n/a") {
      var transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: "alert@worklog.tech",
        to: toMail,
        subject: `${isEmployee.firstName}/Task Ref Mail`,
        text: `Msg : ${description}`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Email sent: " + info.response);
      });
    }

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
    const pageSize = req.query.pageSize;
    const limit = req.query.limit;

    //all task
    const allTask = await workLog.find({ isDeleted: false }).count();
    // console.log(allTask);

    const taskList = await workLog
      .find({ isDeleted: false })
      .sort({ slNo: -1 })
      .limit(limit)
      .skip(limit * pageSize);

    if (!taskList) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: taskList,
      totalTask: allTask,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskByEmployeeId = async (req, res, next) => {
  try {
    const employeeId = req.params.employeeId;
    const pageSize = req.query.pageSize;
    const limit = req.query.limit;

    const taskCount = await workLog
      .find({ employeeId: employeeId, isDeleted: false })
      .count();

    const task = await workLog
      .find({ employeeId: employeeId, isDeleted: false })
      .sort({ slNo: -1 })
      .limit(limit)
      .skip(limit * pageSize);

    if (!task) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: task,
      count: taskCount,
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
    let pageSize = req.query.pageSize ? req.query.pageSize : 0;
    const limit = parseInt(req.query.limit);

    //all task
    const allTask = await workLog.find({ isDeleted: false }).count();

    const task = await workLog
      .aggregate([
        {
          $match: {
            isDeleted: false,
          },
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
            createdAt: 1,
            updatedAt: 1,
            ProjectName: "$projectData.name",
            ProjectCode: "$projectData.projectCode",
            employeeName: "$employeeData.firstName",
          },
        },
      ])
      .sort({ slNo: -1 })
      .skip(limit * pageSize)
      .limit(limit);

    return res.status(200).send({
      status: true,
      message: "Success",
      data: task,
      totalTask: allTask,
    });
  } catch (error) {
    next(error);
  }
};

const filterTask = async (req, res, next) => {
  try {
    const requestQuery = req.query;
    let filterQUery = { isDeleted: false, deletedAt: null };

    const isValidRequestQuery = (requestQuery) => {
      if (Object.keys(requestQuery).length != 0) return true;
      return false;
    };

    const {
      startingTime,
      toDate,
      projectCode,
      employeeId,
      spendTime,
      status,
      DM_To,
      description,
    } = requestQuery;

    if (isValidRequestQuery(requestQuery)) {
      if (isValid(startingTime) && isValid(toDate)) {
        filterQUery["createdAt"] = {
          $gte: new Date(startingTime).toISOString(),
          $lte: new Date(toDate).toISOString(),
        };
      }

      // if (isValid(toDate)) {
      //   filterQUery["createdAt"] = toDate;
      // }

      if (isValid(projectCode)) {
        filterQUery["projectCode"] = projectCode;
      }

      if (isValid(employeeId)) {
        filterQUery["employeeId"] = employeeId;
      }

      if (isValid(spendTime)) {
        filterQUery["spendTime"] = spendTime;
      }

      if (isValid(status)) {
        if (["Pend", "Comp"].indexOf(status) === -1) {
          throw createError(400, "Please choose vaild status");
        }
        filterQUery["status"] = status;
      }

      if (isValid(DM_To)) {
        filterQUery["DM_To"] = DM_To;
      }

      if (isValid(description)) {
        filterQUery["description"] = { $regex: description, $options: "i" };
      }
    }

    const task = await workLog.find(filterQUery).sort({ slNo: -1 });

    if (task.length === 0) {
      throw createError(404, "Data Not Found");
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: task });
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
  filterTask,
};
