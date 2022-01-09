const mongoose = require('mongoose');
const reactionSchema=require('./Reactions')

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })


// Uses mongoose.model() to create model
const Thoughts = mongoose.model('Thought', thoughtSchema);


module.exports = Thoughts;
