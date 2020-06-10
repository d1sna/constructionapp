const {
    Schema,
    model
} = require('mongoose'),
    loginSchema = new Schema({
        fullname: {
            type: String,
            required: true
        },
        employeRank: {
            type: String,
            required: false
        },
        login: {
            type: String,
            required: true
        },
        organistion: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        madeReport: {
            type: Array,
            required: false
        }
    });

let Login = model('Login', loginSchema);


module.exports = Login;