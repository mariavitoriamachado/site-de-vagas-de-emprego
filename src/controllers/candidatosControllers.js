const Candidato = require('../models/candidatoModel');

module.exports = {
  async index(req, res){
    const userCandidato = await Candidato.find();
    res.json(userCandidato);
    },
    async create(req, res) {
      const {nome, email, senha} = req.body;
      let data = {};
      let userCandidato = await Candidato.findOne({email_empresa});
      
    if(!userCandidato) {
        data = {nome, email, senha};
        
        userCandidato = await Candidato.create(data);
        return res.status(200).json(userCandidato);
      }else {
        return res.status(500).json(userCandidato);
      }
    },
    async details(req, res){
      const {_id} = req.params;
      const userCandidato = await Candidato.findOne({_id});
      res.json(userCandidato);
    },
    async delete(req, res){
        const{ _id } = req.params;
        const userCandidato = await Candidato.findByIdAndDelete({_id});
        return res.json(userCandidato);
        },
    async update(req, res) {
        const {_id, nome, email, senha} = req.body;
        const data = {nome, email, senha};
        const userCandidato = await Candidato.findOneAndUpdate({_id},data,{new:true});
        res.json(userCandidato);
      }
}
