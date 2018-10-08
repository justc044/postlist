const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    id: {type: String, required: false},
    createDate: {type: Date, required: false},
    modDate: {type: Date, required: false},
    title: {type: String, required: false},
    content: {type: String, required: false}
});

module.exports = mongoose.model('Post', PostSchema);