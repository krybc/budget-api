const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryGroupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, 'Nazwa grupy kategorii musi być dłuższa niż 5 znaków']
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
    categories: [{
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }]
  },
  {
    collection: 'categoryGroup',
    timestamps: true
  }
);

CategoryGroupSchema.pre("save", function(next) {
  next();
});

let CategoryGroup;

module.exports = CategoryGroup = mongoose.model('CategoryGroup', CategoryGroupSchema);