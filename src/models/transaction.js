const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    contractor: {
      type: Schema.Types.ObjectId,
      ref: 'Contractor',
      required: true
    },
    date: {
      type: Date,
      trim: true,
      required: true
    },
    income: {
      type: Number,
      required: false
    },
    expense: {
      type: Number,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  },
  {
    collection: 'transaction',
    timestamps: true
  }
);

let Transaction;

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);