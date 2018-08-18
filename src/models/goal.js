const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [5, 'dupa']
    }
  },
  {
    collection: 'goal',
    timestamps: true
  }
);

GoalSchema.pre("save", function(next) {

  next();
});

let Goal;

export default Goal = mongoose.model('Goal', GoalSchema);