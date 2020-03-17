const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: { type: String },
    description: { type: String },
    status: { type: String },
}, {
    timestamps: true,
    //versionKey: false, <- to remove __v
});

const Task = mongoose.model(`Task`, taskSchema);

module.exports = Task;