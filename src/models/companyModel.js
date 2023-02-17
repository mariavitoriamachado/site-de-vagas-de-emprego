const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
  nome_company: {
    type:String,
    required:true
},
  email_company: {
    type:String,
    required:true
},
  tipo_company: {
    type: Number, 
    default:1
  },
  senha_company: {
    type:String,
    required:true
}, 
  nome_empresa: {
    type:String ,
    required: true
},
cnpj: {
  type: Number,
  required: true,
},
address: {
  type: String,
  required: true
},
telefone: {
  type: String,
  required: true
},
uf: {
  type: String,
  required: true
},
},{
timestamps: true
});

//criptógrafa a senha
DataSchema.pre('save', function(next){
  if(!this.isModified("senha_company")){
    return next();
  }
  this.senha_company = bcrypt.hashSync(this.senha_company,10);
next();
});

DataSchema.pre('findOneAndUpdate', function(next){
  var password = this.getUpdate().senha_company+'';
  if(password.length<55) {
    this.getUpdate().senha_company = bcrypt.hashSync(password,id);
  }
  next();
}); 

DataSchema.methods.isCorrectPassword = function (password, callback ){
  bcrypt.compare(password,this.senha_company,function(err,same){
      if(err){
          callback(err);
      }else{
          callback(err, same);
      }
  })
}


const companies =  mongoose.model('Companies', DataSchema);
module.exports = companies;