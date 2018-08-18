const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    group: {
      type: Schema.Types.ObjectId,
      ref: 'CategoryGroup',
      required: true
    },
    name: {
      type: String,
      trim: true,
      minlength: [2, 'dupa']
    },
    type: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      required: true,
      default: 1
    },
  },
  {
    collection: 'category',
    timestamps: true
  }
);

CategorySchema.pre("save", function(next) {

  next();
});

let Category;

module.exports = Category = mongoose.model('Category', CategorySchema);