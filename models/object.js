const {
    Schema,
    model
} = require('mongoose'),
    objectSchema = new Schema({
        objectname: {
            type: String
        },
        location: {
            type: String,
            required: true
        },
        deffects: {
            type: String,
            required: true
        },
        photo: {
            type: String,
        },
        result: {
            type: String
        }
    });

let Object = model('Object', objectSchema);


module.exports = Object;