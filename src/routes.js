const express = require('express')
const routes = express.Router();

const Company = require('./controllers/company.controller')
const User = require('./controllers/user.controller')
const Vacancy = require('./controllers/vacancies.controller')

routes.get('/',Company.index)

//Routes Company
routes.post('/api/companies',Company.create);
routes.get('/api/companies',Company.index)
routes.get('/api/companies.details/:_id',Company.details)
routes.delete('/api/companies/:_id',Company.delete)
routes.put('/api/companies',Company.update);
routes.post('/api/companies/login',Company.login);
routes.get('/api/companies/checktoken',Company.checkToken);
routes.get('/api/companies/destroytoken',Company.destroyToken);

//Routes Users
routes.post('/api/users', User.create);
routes.get('/api/users', User.index);
routes.get('/api/users/:_id', User.details);
routes.delete('/api/users/:_id', User.delete);
routes.put('/api/users/:_id', User.update);
routes.post('/api/users/login', User.login);
routes.get('/api/users/checktoken', User.checkToken);
routes.get('/api/users/destroytoken', User.destroyToken);

//Routes vacancies
routes.post('/api/vacancies', Vacancy.create);
routes.get('/api/vacancies',Vacancy.index);
routes.get('/api/vacancies.details/:_id',Vacancy.details);
routes.delete('/api/vacancies/:_id',Vacancy.delete);
routes.put('/api/vacancies',Vacancy.update);

module.exports = routes;



