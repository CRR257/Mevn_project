import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

// Rol
const rol = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} its not a valid role'
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:   { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  date: { type: Date, default: Date.now },
  role: { type: String, default: 'USER', enum: rol },
  active: { type: Boolean, default: true }
});

// hide password of Mongoose userShcema
userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

// Validator
userSchema.plugin(uniqueValidator, { message: 'Error, expected unique {PATH}' });

// Convert to a model
const User = mongoose.model('User', userSchema);

export default User;