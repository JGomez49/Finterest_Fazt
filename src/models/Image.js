const {Schema, model} = require('mongoose');

const imageSchema = new Schema({
    title: {type: String},
    description: {type: String, default: 'Description'},
    filename: {type: String},
    path: {type: String},
    originalname: {type: String},
    mimetype: {type: String},
    size: {type: Number},
    Created_at: {type: Date, default: Date.now()}
});

module.exports = model('Image' , imageSchema);