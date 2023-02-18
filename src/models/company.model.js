const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
  employee_name: {
    type:String,
    required:true
},
  employee_email: {
    type:String,
    required:true
},
  employee_type: {
    type: Number, 
    default:1
  },
  employee_password: {
    type:String,
    required:true
}, 
  company_name: {
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
  if(!this.isModified("employee_password")){
    return next();
  }
  this.employee_password = bcrypt.hashSync(this.employee_password,10);
next();
});

DataSchema.pre('findOneAndUpdate', function(next){
  var password = this.getUpdate().employee_password+'';
  if(password.length<55) {
    this.getUpdate().employee_password = bcrypt.hashSync(password,id);
  }
  next();
}); 

DataSchema.methods.isCorrectPassword = function (password, callback ){
  bcrypt.compare(password,this.employee_password,function(err,same){
      if(err){
          callback(err);
      }else{
          callback(err, same);
      }
  })
}


const companies =  mongoose.model('Companies', DataSchema);
module.exports = companies;