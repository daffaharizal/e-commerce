import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, 'Please provide category name'],
      maxlength: [100, 'Name can not be more than 100 characters']
    }
  },
  { versionKey: false }
);

export default mongoose.model('Category', CategorySchema);
