const express = require('express');
const router = express.Router();
import User from '../models/user';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

router.get('/', async(req, res) => {
  res.json({mensaje: 'Works :)'})
})

router.post('/', async(req, res) => {

    let body = req.body;
  
    try {
      const userDB = await User.findOne({email: body.email});

      if(!userDB){
        return res.status(400).json({
          message: 'Invalid user or password',
        });
      }

      if( !bcrypt.compareSync(body.pass, userDB.password) ){
        return res.status(400).json({
          message: 'Invalid user or password',
        });
      }

      // Generar Token
        let token = jwt.sign({
            data: userDB
        }, 'secret', { expiresIn: 60 * 60 * 24 * 30}) // Expire in 30 days
  
      return res.json({
        userDB,
        token: token
      })
      
    } catch (error) {
      return res.status(400).json({
        message: 'An error has happened during application run',
        error
      });
    }
  
  });
module.exports = router;