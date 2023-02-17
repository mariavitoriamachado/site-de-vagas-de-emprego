const Vacancy = require('../models/vacanciesModel');

module.exports = {
  async index(req, res){
    const vacancy = await Vacancy.find();
    res.json(vacancy);
    },
    async create(req, res) {
      const {job_name, vacancy_description, requirements, salary_range} = req.body;
      let data = {};
      let vacancy = await Vacancy.findOne({job_name});
      
      if(!vacancy) {
        data = {job_name, vacancy_description, requirements, salary_range};
        vacancy = await Vacancy.create(data);
        return res.status(200).json(vacancy);
      }else {
        return res.status(500).json(vacancy);
      }
    },
    async details(req, res){
      const {_id} = req.params;
      const vacancy = await Vacancy.findOne({_id});
      res.json(vacancy);
    },
      async delete(req, res){
        const{ _id } = req.params;
        const vacancy = await Vacancy.findByIdAndDelete({_id});
        return res.json(vacancy);
        },
        async update(req, res) {
        const {_id, job_name, vacancy_description, requirements, salary_range} = req.body;     
        const data = {job_name, vacancy_description, requirements, salary_range};
        const vacancy = await Vacancy.findOneAndUpdate({_id},data,{new:true});
        res.json(vacancy);
      }
}