const express = require('express');
const Users = require('./users/userDb');

const server = express();

function logger(req, res, next) {
    console.log(req.method, req.originalUrl, Date.now());
    next();
}

function validateUserId(req, res, next) {
    const userID = req.params.id;
    if (userID)
    next();
}

function validateUser(req, res, next) {
    if (req.body) {
        next();
    } else {
        res.status(400).console.log("missing required name field")
    }
}

function validatePost(req, res, next) {
    if (req.body) {
        next();
    } else {
        res.status(400).console.log("missing required post data")
    }
}

server.get('/api/users', (req, res) => {
    Users.get().then(users => res.status(200).json(users))
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.getById(id).then(users => res.status(200).json(users))
});

server.get('/api/users/:id/posts', (req, res) => {
    const id = req.params.id;
    Users.getUserPosts(id).then(users => res.status(200).json(users))
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    Users.insert(user).then(r => console.log(r))
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Users.update(id, changes).then(r => console.log(r))
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
});

const port = 5000;

server.listen(port);