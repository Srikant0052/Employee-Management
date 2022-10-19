const createError = require("http-errors");
const projectColl = require("../models/projects");
const { generateId } = require("../utils/helpers");
const { isValidRequestBody, isValid } = require("../utils/validator");

const addProject = async (req, res, next) => {
  try {
    let requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
      throw createError(400, `invalid request params`);
    }

    let { name, description, customerId, date } = req.body;

    // if (!isValidRequestBody(req.body)) {
    //   throw createError(400, `invalid request params`);
    // }

    if (!isValid(name)) {
      throw createError(400, `Please Enter A Valid Project name`);
    }

    if (!isValid(description)) {
      throw createError(400, `Please Enter A Valid Project description`);
    }

    let projectCode = generateId();

    const projectData = { projectCode, name, description, customerId, date };

    const project = await projectColl.create(projectData);

    if (!project) {
      throw createError(500, "Unable to Proccess Data");
    }

    return res.status(201).send({
      status: false,
      message: "Project Successfully Added",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addProject };
