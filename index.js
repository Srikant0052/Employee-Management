require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
var cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./src/utils/errors");
let port = process.env.PORT || 4000;
const employeeRoutes = require("./src/routes/employeeRoutes");
const worklogRoutes = require("./src/routes/worklogRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const customerRoutes = require("./src/routes/customerRoutes");
const cors = require("cors");
require("./src/db/connect");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/", employeeRoutes);
app.use("/", worklogRoutes);
app.use("/", projectRoutes);
app.use("/", customerRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, (_) => console.log(`Server is running on port ${port}`));
