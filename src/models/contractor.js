const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractorSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [3, 'Nazwa musi być dłuższa niż 3 znaki']
    },
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    }
  },
  {
    collection: 'contractor',
    timestamps: true
  }
);

ContractorSchema.pre("save", function(next) {

  next();
});

let Contractor;

module.exports = Contractor = mongoose.model('Contractor', ContractorSchema);