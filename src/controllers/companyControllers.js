const Company = require('../models/companyModel');
const jwt = require("jsonwebtoken");
// const { checkout } = require('../routes');
const secret = "mysecret";

module.exports = {
  async index(req, res){
    const user = await Company.find();
    res.json(user);
    },
    async create(req, res) {
      const {nome_company, email_company, tipo_company, senha_company, nome_empresa, Cnpj, Endereco, Telefone, Uf} = req.body;
      let data = {};
//verificar se o email já tem cadastro
      let user = await Company.findOne({email_company});
      
      if(!user) {
        data = {nome_company, email_company, tipo_company, senha_company, nome_empresa, Cnpj, Endereco, Telefone, Uf};
        
        user = await Company.create(data);
        return res.status(200).json(user);
      }else {
        return res.status(500).json(user);
      }
    },
    async details(req, res){
      const {_id} = req.params;
      const user = await Company.findOne({_id});
      res.json(user);
    },
      async delete(req, res){
        const{ _id } = req.params;
        const user = await Company.findByIdAndDelete({_id});
        return res.json(user);
        },
        async update(req, res) {
        const {_id, nome_company, email_company, tipo_company, senha_company, nome_empresa, Cnpj, Endereco, Telefone, Uf} = req.body;     
        const data = {nome_company, email_company, tipo_company, senha_company, nome_empresa, Cnpj, Endereco, Telefone, Uf};
        const user = await Company.findOneAndUpdate({_id},data,{new:true});
        res.json(user);
      },
      async login(req, res){
        const { email, senha } = req.body;
        Company.findOne({email_company: email}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({erro: "Erro no servidor. Por favor, tente novamente"});
            }else if (!user){
                res.status(200).json({status:2, error: 'E-mail não encontrado no banco de dados'});
            }else{
                user.isCorrectPassword(senha, async function (err, same){
                    if(err){
                        res.status(200).json({error: "Erro no servidor. Por favor, tente novamente"});
                    }else if(!same){
                        res.status(200).json({status:2, error: "A senha não confere"});
                    }else{
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
              res.cookie('token', token, {httpOnly: true});
              res.status(200).json({status:1, auth:true, token:token,id_client: user._id,user_name:user.nome_company,user_type:user.tipo_company});
    }
  })
}
})
},
async checkToken(req,res){
    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
    if(!token){
        res.json({status:401,msg:'Não autorizado: Token inexistente!'});
    }else{
        jwt.verify(token, secret, function(err, decoded){
            if(err){
                res.json({status:401,msg:'Não autorizado: Token inválido!'});
            }else{
                res.json({status:200})
            }
        })
    }
  },
  async destroyToken(req,res){
    const token = req.headers.token;
    if(token){
        res.cookie('token',null,{httpOnly:true});
    }else{
        res.status(401).send("Logout não autorizado!")
    }
    res.send("Sessão finalizada com sucesso!");
}
}