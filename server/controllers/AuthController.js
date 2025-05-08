const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
      // console.log("Request Body:", req.body);  // Log the body to check if it's being received correctly
      const { name, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists", success: false });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserModel({ name, email, password: hashedPassword });
      await user.save();

      res.status(201).json({
        message: "User created successfully",
        success: true
      });
    } catch (err) {
      console.error("Signup Error:", err);
      res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  };

  
const login = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // Log the body to check if it's being received correctly
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    const errorMsg = 'Auth failed email or password is wrong' ;
    if (!existingUser) {
      return res.status(403).json({ message: errorMsg , success: false });
    }

    const isPassEqual = await bcrypt.compare(password , existingUser.password) ;
    if(!isPassEqual) {
      return res.status(403) 
      .json({message : errorMsg, success: false}) ;
    }

    const jwtToken = jwt.sign(
      {email: existingUser.email , _id:existingUser._id},
      process.env.JWT_SECRET , 
      {expiresIn : '24h'}
    )
    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: existingUser.name
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

module.exports = { signup,
  login
 };
