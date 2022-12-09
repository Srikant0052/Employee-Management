const createError = require("http-errors");
const empCollection = require("../models/employee");
const projectColl = require("../models/projects");
const { isValidRequestBody, isValid } = require("../utils/validator");

const addProject = async (req, res, next) => {
  try {
    let requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `Invalid request Data`);
    }

    let {
      name,
      projectCode,
      description,
      customerId,
      companyName,
      date,
      logedInEmployee,
    } = requestBody;

    const isAdmin = await empCollection.findOne({
      employeeId: logedInEmployee,
      isDeleted: false,
    });

    if (req.employee != isAdmin._id && req.employeeRole != isAdmin.role) {
      throw createError(401, "Unauthorized Access");
    }

    if (!isValid(name)) {
      throw createError(400, `Please Enter Project name`);
    }

    if (!isValid(projectCode)) {
      throw createError(400, `Please Enter Project Code`);
    }
    if (!isValid(description)) {
      throw createError(400, `Please Enter Project description`);
    }

    let slNo = (await projectColl.find().count()) + 1;

    const projectData = {
      slNo,
      projectCode,
      name,
      description,
      customerId,
      companyName,
      date,
    };

    const project = await projectColl.create(projectData);

    if (!project) {
      throw createError(500, "Unable to Proccess Data");
    }

    return res.status(201).send({
      status: true,
      message: "Project Successfully Added",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectDataById = async (req, res, next) => {
  try {
    const projectCode = req.params.projectCode;

    const project = await projectColl.findOne({ projectCode: projectCode });

    if (!project) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projectList = await projectColl.find();

    if (!projectList) {
      throw createError(404, "Data Not Found");
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: projectList,
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const projectCode = req.params.projectCode;
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `Invalid request Data`);
    }
    const { status } = requestBody;

    const project = await projectColl.findOne({ projectCode: projectCode });

    if (!project) {
      throw createError(404, "Data Not Found");
    }

    const updatedProject = await projectColl.findOneAndUpdate(
      { projectCode: projectCode },
      { $set: { status: status } },
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Success", data: updatedProject });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProject,
  getProjectDataById,
  updateProject,
  getAllProjects,
};
