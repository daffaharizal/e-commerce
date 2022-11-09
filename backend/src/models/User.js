const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide full name'],
      minlength: [3, 'Full Name can be atleast 3 characters long'],
      maxlength: [128, 'Full Name cannot be more than 128 characters']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email'
      }
    },
    dateOfBirth: {
      type: Date
      // validate: {
      //   validator: validator.Date,
      //   message: 'Please provide a valid date'
      // }
    },

    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
      maxlength: 16
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  // delete obj._id;
  delete obj.password;
  obj.dateOfBirth =
    obj.dateOfBirth && moment(obj.dateOfBirth).format('YYYY/MM/DD');
  return obj;
};

module.exports = mongoose.model('User', userSchema);
