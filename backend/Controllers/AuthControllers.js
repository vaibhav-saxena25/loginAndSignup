const UserModel = require('../Models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async(req,res)=>{
  try{
    const {name,email,password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      return res.status(409).json({message:'User already exist you can login ',success:false});
    }
    const userModel = new UserModel({name,email,password});
    userModel.password = await bcrypt.hash(password,10);
    await userModel.save();
    res.status(201).json({
      message:"signup successfully",
      success:true
    })
  }catch(err){
    res.status(500).json({
      message:"Internal server error",
      success:false
    })
  }
}

const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      const errorMsg = 'Auth failed: email or password is wrong';

      if (!user) {
          return res.status(403).json({ message: errorMsg, success: false });
      }

      // Check if the password is correct
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
          return res.status(403).json({ message: errorMsg, success: false });
      }

      // Generate a JWT token
      const jwtToken = jwt.sign(
          {
              email: user.email,
              _id: user._id
          },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
      );

      // Send a success response
      res.status(200).json({
          message: "Login successful",
          success: true,
          jwtToken,
          email,
          name: user.name // Fixed typo from 'naem' to 'name'
      });
  } catch (err) {
      console.error(err); // Log error for debugging
      res.status(500).json({
          message: "Internal server error",
          success: false
      });
  }
};

module.exports = {
  signup,
  login
}