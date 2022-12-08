const { Schema, model, default: mongoose } = require("mongoose");

const worklogSchema = new Schema(
  {
    slNo: {
      type: Number,
      unique: true,
    },

    taskId: {
      type: String,
      unique: true,
    },

    employeeId: {
      type: String,
      ref: "Employee",
    },

    projectCode: {
      type: String,
      ref: "Project",
      trim: true,
    },

    description: {
      type: String,
      requied: true,
      trim: true,
    },

    startingTime: {
      type: String,
      required: true,
    },

    // unixTime: {
    //   type: Number,
    //   default: (unixTime = function unixTimestamp() {
    //     return Math.floor(Date.now() / 1000);
    //   }),
    // },

    status: {
      type: String,
      enum: ["Pend", "Comp"],
      default: "Pend",
      trim: true,
    },

    spendTime: {
      type: String,
      default: 0,
    },

    DM_To: {
      type: String,
      default: "n/a",
      trim: true,
    },

    note: {
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

module.exports = model("Worklog", worklogSchema);
