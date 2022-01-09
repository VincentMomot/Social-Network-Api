const {Schema, model} = require('mongoose');

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },

  email: {
    type: String,
    required: true,
    unique:true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  thoughts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Thoughts'
  }],
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'Users'
  }],
 
},
{
  toJSON:{
    virtuals:true,
  },
  id:false,
 });

userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

// Uses mongoose.model() to create model
const Users = model('Users', userSchema);

module.exports = Users;
