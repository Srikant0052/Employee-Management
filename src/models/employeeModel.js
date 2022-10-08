const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    // phone: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     match: /^(\+\d{1,3}[- ]?)?\d{10}$/   // validate mobile number using Regex
    // },

    email: {
      type: String,
      required: true,
      lowercase: true,
     // match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      unique: true,
      trim: true,
    },

    dateOfJoining: {
      type: String,
    },

    // password: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   match:
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, // Password validation using Regex
    //   minlength: 8,
    //   maxlength: 15,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema); //employees
