const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
  nome_usuario: {
    type:String,
    required:true
},
  email_usuario: {
    type:String,
    required:true
},
  tipo_usuario: {
    type: Number, 
    default:1
  },
  senha_usuario: {
    type:String,
    required:true
}, 
  nome_empresa: {
    type:String ,
    required: true
},
Cnpj: {
  type: Number,
  required: true,
},
Endereco: {
  type: String,
  required: true
},
Telefone: {
  type: String,
  required: true
},
Uf: {
  type: String,
  required: true
},
},{
timestamps: true
});
//para criptografar a senha
DataSchema.pre('save', function(next){
  if(!this.isModified("senha_usuario")){
    return next();
  }
  this.senha_usuario = bcrypt.hashSync(this.senha_usuario,10);
next();
});

DataSchema.pre('findOneAndUpdate', function(next){
  var password = this.getUpdate().senha_usuario+'';
  if(password.length<55) {
    this.getUpdate().senha_usuario = bcrypt.hashSync(password,id);
  }
  next();
}); 

DataSchema.methods.isCorrectPassword = function (password, callback ){
  bcrypt.compare(password,this.senha_usuario,function(err,same){
      if(err){
          callback(err);
      }else{
          callback(err, same);
      }
  })
}


const usuarios =  mongoose.model('Usuarios', DataSchema);
module.exports = usuarios;