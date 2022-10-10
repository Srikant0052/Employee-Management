const { Schema, model } = require('mongoose')


const projectSchema = new Schema({

    slNo: {
        type: Number
    },

    projectCode: {
        type: String,
        requied: true
    },

    name: {
        type: String,
        required: true
    },
    
    description : {
        type : String,
        required : true
    },
    
    status : {
        type : String,
    },

    customerId : {
        type : String,
        ref : 'Customer'
    }

}, { timestamps: true })

module.exports = model('Project', projectSchema)