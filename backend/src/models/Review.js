import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please provide rating'],
      min: 1,
      max: 5
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100
    },
    comment: {
      type: String
    },
    product: {
      type: mongoose.Types.ObjectId,
      role: 'Product',
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
);

// unique together
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
});

ReviewSchema.pre(['find', 'findOne', 'findOneAndUpdate'], function () {
  this.populate({
    path: 'user',
    select: 'fullName'
  });
});

ReviewSchema.statics.CalculateAvgRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0].averageRating || 0),
        numOfReviews: result[0].numOfReviews || 0
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post(['save', 'remove'], async function () {
  await this.constructor.CalculateAvgRating(this.product);
});

export default mongoose.model('Review', ReviewSchema);
