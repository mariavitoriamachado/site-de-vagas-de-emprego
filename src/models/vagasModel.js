const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
nome_vaga: {
  type: String,
  required: true
},
descricao_vaga: {
  type: String,
  required: true
},
requisito: {
  type: String,
  required: true
},
faixaSalario: {
  type: Number,
  required: true
},
},{
  timestamps: true
  });
const vagas =  mongoose.model('Vagas', DataSchema);
module.exports = vagas;