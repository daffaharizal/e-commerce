import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
    minlength: [3, 'Full Name can be atleast 3 characters long'],
    maxlength: [128, 'Full Name cannot be more than 128 characters']
  },
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

export default AddressSchema;
