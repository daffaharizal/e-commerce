import mongoose from 'mongoose';

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

export default AddressSchema;
