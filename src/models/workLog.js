const { Schema, model } = require('mongoose')


const worklogSchema = new Schema({

    empCode: {
        type: String,
        ref: 'Employee'
    },

    projectCode: {
        type: String,
        ref: 'Project'
    },

    description: {
        type: String,
        requied: true
    },

    startingTime: {
        type: String,
        required: true
    },

    endingTime: {
        type: String,
        required: true
    },

    status: {
        
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'

    },

    spendTime: {
        type: String,
    }


}, { timestamps: true })

module.exports = model('Worklog', worklogSchema)