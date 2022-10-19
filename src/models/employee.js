const { Schema, model, default: mongoose } = require("mongoose");

const employeeSchema = new Schema(
  {
    slNo: {
      type: Number,
    },

    employeeId: {
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
      required: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
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

module.exports = model("Employee", employeeSchema);
