const express = require('express');

const routes = express.Router();

const Usuario = require('./controllers/usersControllers')
routes.get('/', Usuario.index);
const Candidato = require('./controllers/candidatoControllers')
routes.get('/', Candidato.index);
const Vaga = require('./controllers/vagasControllers')
routes.get('/', Vaga.index);

//rotas de usuario
routes.post('/api/usuarios',Usuario.create);
routes.get('/api/usuarios',Usuario.index);
routes.get('/api/usuarios.details/:_id',Usuario.details);
routes.delete('/api/usuarios/:_id',Usuario.delete);
routes.put('/api/usuarios',Usuario.update);
routes.post('/api/usuarios/login',Usuario.login);
routes.get('/api/usuarios/ckecktoken',Usuario.checkToken);
routes.get('/api/usuarios/destroytoken',Usuario.destroyToken);

//rotas de Candidato
routes.post('/api/candidatos',Candidato.create);
routes.get('/api/candidatos',Candidato.index);
routes.get('/api/candidatos.details/:_id',Candidato.details);
routes.delete('/api/candidatos/:_id',Candidato.delete);
routes.put('/api/candidatos',Candidato.update);
routes.post('/api/candidatos/login',Candidato.login);
routes.get('/api/candidatos/ckecktoken',Candidato.checkToken);
routes.get('/api/candidatos/destroytoken',Candidato.destroyToken);

//rotas de vagas
routes.post('/api/vagas',Vaga.create);
routes.get('/api/vagas',Vaga.index);
routes.get('/api/vagas.details/:_id',Vaga.details);
routes.delete('/api/vagas/:_id',Vaga.delete);
routes.put('/api/vagas',Vaga.update);

module.exports = routes;

