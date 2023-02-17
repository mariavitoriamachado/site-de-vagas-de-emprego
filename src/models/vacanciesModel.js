const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
job_name: {
  type: String,
  required: true
},
vacancy_description: {
  type: String,
  required: true
},
requirements: {
  type: String,
  required: true
},
salary_range: {
  type: Number,
  required: true
},
},{
  timestamps: true
  });
const vacancies =  mongoose.model('Vacancies', DataSchema);
module.exports = vacancies;