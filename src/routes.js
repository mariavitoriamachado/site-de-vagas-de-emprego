const express = require('express')

const routes = express.Router();

routes.get('/', function(req, res) {
  res.json({message: 'Hello, world'})
})

module.exports = routes;