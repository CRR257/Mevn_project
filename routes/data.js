import express from "express";
const router = express.Router();

import Data from "../models/data";
import User from "../models/user";

// Middlewares
const {verificateAuth, verificateRol} = require('../middleware/autentication');

//Rutes
router.post("/new-data", async (req, res) => {
  let body = req.body;
  console.log(req.user);
  // body.userId = req.user._id;

  try {
    const dataDB = await Data.create(body);
    // res.status(200).json(dataDB);
    // return res.json(dataDB);
    res.json(dataDB);


  } catch (error) {
    return res.status(500).json({
      message: "An error has happened during creation data",
      error
    });
  }
});

router.get("/data/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const dataDB = await Data.findOne({ _id });
    res.json(dataDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has happened during application run",
      error
    });
  }
});
 // get all data
router.get("/", async (req, res) => {
  
  // const userId = req.user._id;

  try {
    // const dataDB = await Data.find({userId});

    const dataDB = await Data.find();
    res.json(dataDB);
    //return res.json(dataDB);

  } catch (error) {
    return res.status(400).json({
      message: "An error has happened during application run",
      error
    });
  }
});

router.delete("/data/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const dataDB = await Data.findByIdAndDelete({ _id });
    if (!dataDB) {
      return res.status(400).json({
        message: "This ID doesn't exist"
      });
    }
    res.json(dataDB);
  } catch (error) {
    return res.status(400).json({
      message: "An error has happened during application run",
      error
    });
  }
});

router.put('/data/:id', async(req,res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const dataDB = await Data.findByIdAndUpdate(_id, body, {new: true});
        res.json(dataDB);

    }catch(error) {
        return res.status(400).json({
            message: "An error has happened during application run",
            error
          });
    }
})
module.exports = router;
