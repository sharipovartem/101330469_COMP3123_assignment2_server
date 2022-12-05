const mongoose = require('mongoose')
const validator = require('validator')

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is already in a system"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Incorrect email")
            }
        }
    }
})

const employee =  new mongoose.model('employee',employeeSchema);

module.exports = employee;