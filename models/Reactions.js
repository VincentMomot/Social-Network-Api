const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: { type: mongoose.Types.ObjectId, default:()=> new Types.ObjectId()  },

  reactionBody:{
    type:String,
    required:true,
    max_length: 280,
  },
  username:{
    type:String,
    required:true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});


module.exports = reactionSchema;
