const Vaga = require('../models/vagasModel');

module.exports = {
  async index(req, res){
    const vaga = await Vaga.find();
    res.json(vaga);
    },
    async create(req, res) {
      const {nome_vaga, descricao_vaga, requisito, faixaSalario} = req.body;
      let data = {};
      let vaga = await Vaga.findOne({nome_vaga});
      
      if(!vaga) {
        data = {nome_vaga, descricao_vaga, requisito, faixaSalario};
        vaga = await Vaga.create(data);
        return res.status(200).json(vaga);
      }else {
        return res.status(500).json(vaga);
      }
    },
    async details(req, res){
      const {_id} = req.params;
      const vaga = await Vaga.findOne({_id});
      res.json(vaga);
    },
      async delete(req, res){
        const{ _id } = req.params;
        const vaga = await Vaga.findByIdAndDelete({_id});
        return res.json(vaga);
        },
        async update(req, res) {
        const {_id, nome_vaga, descricao_vaga, requisito, faixaSalario} = req.body;     
        const data = {nome_vaga, descricao_vaga, requisito, faixaSalario};
        const vaga = await Vaga.findOneAndUpdate({_id},data,{new:true});
        res.json(vaga);
      }
}