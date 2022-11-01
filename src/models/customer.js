const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    slNo: {
      type: Number,
    },

    customerId: {
      type: String,
      requied: true,
    },

    name: {
      type: String,
      required: true,
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

module.exports = model("Customer", customerSchema);
