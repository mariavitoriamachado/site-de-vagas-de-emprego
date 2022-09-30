const express = require('express')


routes.get('/', function(req, res) {
  res.json({message: 'Hello, world'})
})

module.exports = routes;