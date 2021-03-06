const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");

const thoughtSchema = new Schema(
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
    createdAt:{
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
          moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })


const Thought = model('thought', thoughtSchema);


module.exports = Thought;
