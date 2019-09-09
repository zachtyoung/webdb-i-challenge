const express = require('express');

const db = require('./data/dbConfig.js')

const server = express();

server.use(express.json());

server.get('/', (req,res)=>{
    db('accounts')
    .then(resp =>{
        res.json(resp);
    })
    .catch(err => {
        res.status(500).json({message: "failed to get accounts"})
    })
})
server.get('/:id', (req,res)=>{
    const {id} = req.params

    db('accounts').where({id})
    .then(accounts =>{
        const account = accounts[0];
        if(account){
            res.json(account)
        } else{
            res.status(404).json({message:"invalid account id"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "failed to get account"})
    })
})

server.post('/', (req,res)=>{
    const accountData = req.body
    db('accounts').insert(accountData)
    .then(resp =>{
        res.status(201).json(resp);
    })
    .catch(err => {
        res.status(500).json({message: "failed to get accounts"})
    })
})

server.put('/:id', (req,res)=>{
    const {id} = req.params;
    const changes = req.body;

    db('accounts').where({id}).update(changes)
    .then(count =>{
        if(count){
            res.json({updated:count})
        } else{
            res.status(404).json({message: "invalid account id"})
        }
    })
    .catch(err =>{
        res.status(500).json({message: "failed to update account"})
    })
})

server.delete('/:id', (req,res)=>{
    const {id} = req.params;

    db('accounts').where({id}).del()
    .then(count =>{
        if(count){
            res.json({deleted: count})
        }else{
            res.status(404).json({message: 'invalid account id'})
        }
    })
    .catch(err =>{
        res.status(500).json({message: 'falied to delete account'})
    })
})
module.exports = server;