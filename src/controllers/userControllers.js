const User = require('../models/userModel');

module.exports = {
  async index(req, res){
    const userUser = await User.find();
    res.json(userUser);
    },
    async create(req, res) {
      const {name, email, password} = req.body;
      let data = {};
      let userUser = await User.findOne({email_empresa});
      
    if(!userUser) {
        data = {name, email, password};
        
        userUser = await User.create(data);
        return res.status(200).json(userUser);
      }else {
        return res.status(500).json(userUser);
      }
    },
    async details(req, res){
      const {_id} = req.params;
      const userUser = await User.findOne({_id});
      res.json(userUser);
    },
    async delete(req, res){
        const{ _id } = req.params;
        const userUser = await User.findByIdAndDelete({_id});
        return res.json(userUser);
        },
    async update(req, res) {
        const {_id, name, email, password} = req.body;
        const data = {name, email, password};
        const userUser = await User.findOneAndUpdate({_id},data,{new:true});
        res.json(userUser);
      }
}
