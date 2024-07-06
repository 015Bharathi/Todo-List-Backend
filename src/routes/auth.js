const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const { User } = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const { id } = require("@hapi/joi/lib/base");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({message:"Email already exists"});

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({savedUser});
  } catch (err) {
    res.status(400).send({message:err.message});
  }
});

router.post("/login", async(req, res) => {
  const { error } = (req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try{

    const user = await User.findOne({email:req.body.email})

    if(!user) return res.status(400).send({message:"Email is not found"})
  
      const validPass = bcrypt.compare(req.body.password, user.password)
      if(!validPass) return res.status(400).send({message:"password invalid"})
      
      const token = jwt.sign({_id: user._id}, process.env.SCERET_TOKEN)
      res.header("auth-token",token).send(token)
  }catch (err) {
    res.status(500).send({message:"Server error"});
  }
});

module.exports = router;
