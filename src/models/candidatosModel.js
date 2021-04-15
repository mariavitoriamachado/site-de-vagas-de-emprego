const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

  const DataSchema = new mongoose.Schema({
    nome: {
      type:String ,
      required: true
  },
    email: {
      type: String,
      required: true
  },
    
    senha: {
      type: String,
      required: true
  },
},{
  timestamps: true
  });

//para criptografar a senha
DataSchema.pre('save', function(next){
  if(!this.isModified("senha")){
    return next();
  }
  this.senha= bcrypt.hashSync(this.senha,10);
next();
});

DataSchema.pre('findOneAndUpdate', function(next){
  var password = this.getUpdate().senha+ '';
  if(password.length<55) {
    this.getUpdate().senha = bcrypt.hashSync(password,id);
  }
  next();
}); 

const candidatos =  mongoose.model('Candidato', DataSchema);
module.exports = candidatos;