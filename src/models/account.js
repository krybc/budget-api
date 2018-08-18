const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [5, 'Nazwa jest za krótka']
    },
    amount: {
      type: Number,
      trim: true
    }
  },
  {
    collection: 'account',
    timestamps: true,
  }
);

AccountSchema.pre("save", function(next) {

  next();
});

let Account;

module.exports = Account = mongoose.model('Account', AccountSchema);