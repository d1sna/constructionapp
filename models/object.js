const {
    Schema,
    model
} = require('mongoose'),
    schema = new Schema({
        title: {
            type: String,
            required: true
        }
    });

module.exports = schema;