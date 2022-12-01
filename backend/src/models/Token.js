const mongoose = require('mongoose');

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

module.exports = mongoose.model('Token', TokenSchema);
