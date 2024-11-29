const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const uploadToCloud = require("../Middleware/UploadToStorage");

dotenv.config();

const userController = {
  async register(req, res) {
    const { email, password } = req.body;

    try {
      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already used!" });
      }

      const newUser = await userModel.createUser(email, password);
      res.status(201).json({ message: "Registration successful!", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "An error occurred during registration." });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Email not found!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password!" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY
      );
      res.status(200).json({ message: "Login successful!", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "An error occurred during login." });
    }
  },

  async updateDetails(req, res) {
    const { userId } = req.user;
    const { username, gender, dob, savings } = req.body;
    
    try {
      let photoUrl = null;

      if (req.file) {
        photoUrl = await uploadToCloud(req.file, "profile-pictures");
      }

      const updates = {
        username,
        gender,
        dob,
        savings: savings ? parseFloat(savings) : null,
        photoUrl,
      };

      const result = await userModel.updateUserDetails(userId, updates);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error during profile update:", error);
      res.status(500).json({ message: "An error occurred while updating the profile." });
    }
  },

  async getProfile(req, res) {
    const { userId } = req.user;

    try {
      const profile = await userModel.getUserProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "User not found!" });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "An error occurred while fetching the profile." });
    }
  },

  async getData(req, res) {
    const { userId } = req.user;
    try {
      const result = await userModel.getAllData(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
