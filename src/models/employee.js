const { Schema, model } = require("mongoose");

const employeeSchema = new Schema(
  {

    slNo: {
      type: Number,
    },

    empCode: {

      type: String,
      required: true,
      unique: true,
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

    userName: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfJoining: {
      type: String,
    },

    password: {

      type: String,
      required: true,
      trim: true,
      match:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
      minlength: 8,
      maxlength: 15,
      
    },

  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema)
