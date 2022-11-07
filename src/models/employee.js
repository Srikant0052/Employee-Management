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

    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },

    userName: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },

    dateOfJoining: {
      type: String,
    },

    mobile: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 15,
    },

    role: {
      type: String,
      enum: ["Employee", "Admin"],
    },

    address: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
