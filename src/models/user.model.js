const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

  const DataSchema = new mongoose.Schema({
    name: {
      type:String ,
      required: true
  },
    email: {
      type: String,
      required: true
  },
    password: {
      type: String,
      required: true
  },
},{
  timestamps: true
  });

DataSchema.pre('save', function(next){
  if(!this.isModified("password")){
    return next();
  }
  this.password= bcrypt.hashSync(this.password,10);
next();
});

DataSchema.pre('findOneAndUpdate', function(next){
  var password = this.getUpdate().password+ '';
  if(password.length<55) {
    this.getUpdate().password = bcrypt.hashSync(password,id);
  }
  next();
}); 

const users =  mongoose.model('User', DataSchema);
module.exports = users;