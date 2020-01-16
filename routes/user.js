var express = require('express');
var router = express.Router();
const _ = require('underscore');
const {verificateAuth, verificateRol} = require('../middleware/autentication');

import User from '../models/user';

// Hash Password
const bcrypt = require('bcrypt');
const saltRounds = 10;
/* saltRounds = cost factor => controls how much time is needed 
to calculate a single BCrypt hash*/

router.post('/new-user', [verificateAuth, verificateRol], async (req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try {

        const userDB = await User.create(body);

        return res.json(userDB);

    } catch (error) {
        return res.status(500).json({
            mensaje: 'An error has happened during application run',
            error
        });
    }

});

router.get('/user', verificateAuth , async(req, res) => {
    res.send('respond with a resource');
});

// router.get('/user', verificarAuth , async(req, res) => {

router.put('/user/:id', [verificateAuth, verificateRol], async (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'role', 'password']);

    if (body.pass) {
        body.pass = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    try {
        const userDB = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        // {new:true} return new user updated
        // {runValidators: true} add only valid roles

        return res.json(userDB);

    } catch (error) {
        return res.status(400).json({
            message: 'An error has happened during application run',
            error
        })
    }
});

router.delete('/user/:id', [verificateAuth, verificateRol], async(req, res) => {

    let id = req.params.id;
  
    try {
  
      const userDelete = await User.findByIdAndRemove(id);
  
      if(!userDelete){
        return res.status(400).json({
          message: 'User not found'
        })
      }
  
      return res.json(usuarioDelete);
      
    } catch (error) {
      return res.status(400).json({
        message: 'An error has happened during application run',
        error
      })
    }
  
  });


module.exports = router;