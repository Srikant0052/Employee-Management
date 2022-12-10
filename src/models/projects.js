const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    slNo: {
      type: Number,
    },

    projectCode: {
      type: String,
      requied: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },

    customerId: {
      type: String,
      ref: "Customer",
      trim: true,
    },

    note: {
      type: String,
    },

    date: {
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

module.exports = model("Project", projectSchema);
