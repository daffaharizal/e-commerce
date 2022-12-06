import bcrypt from 'bcryptjs';
import moment from 'moment';
import mongoose from 'mongoose';
import validator from 'validator';

import ImageSchema from './Image';

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Please provide country']
  },
  province: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'Please provide city']
  },
  street1: {
    type: String,
    required: [true, 'Please provide city']
  },
  street2: {
    type: String
  },
  zip: {
    type: String,
    required: [true, 'Please provide zip code']
  }
});

const UserSchema = new mongoose.Schema(
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
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 6,
      maxlength: 128
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    isAccountVerified: {
      type: Boolean,
      default: false
    },
    avatar: ImageSchema,
    billingAddress: [AddressSchema],
    shippingAddress: [AddressSchema]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Error Handling Middleware
UserSchema.post('save', function ({ errors }, doc, next) {
  if (!!errors.dateOfBirth) {
    next(new Error('Provide a valid date of birth'));
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password);
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  // delete obj._id;
  delete obj.password;
  obj.dateOfBirth =
    obj.dateOfBirth && moment(obj.dateOfBirth).format('YYYY/MM/DD');
  return obj;
};

export default mongoose.model('User', UserSchema);
