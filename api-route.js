#!/bin/env node
"esversion:6";
"strict mode";

const errors = require('restify-errors');

module.exports = (server) =>{
    server.get('/api/demo', (req, res, next)=>{
        res.send(201);
    });
}

