import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: {type: String, required: [true, 'add a name']},
    description: String,
    userId: String,
    date: {type: Date, default: Date.now},
    active: { type: Boolean, default: true}
})

const Data = mongoose.model('Data', dataSchema);

export default Data;