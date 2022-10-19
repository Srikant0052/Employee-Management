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
  },
  { timestamps: true }
);

module.exports = model("Customer", customerSchema);
