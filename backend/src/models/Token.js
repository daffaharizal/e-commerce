import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      trim: true,
      maxlength: 256
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

TokenSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export default mongoose.model('Token', TokenSchema);
