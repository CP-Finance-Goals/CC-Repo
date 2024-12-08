const userModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const uploadToCloud = require("../Middleware/UploadToStorage");

dotenv.config();

const userController = {
  async register(req, res) {
    const { email, password, name } = req.body;

    try {
      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already used!" });
      }

      const newUser = await userModel.createUser(email, password, name);
      res
        .status(201)
        .json({ message: "Registration successful!", user: newUser });
    } catch (error) {
      console.error("Error during registration:", error);
      res
        .status(500)
        .json({ message: "An error occurred during registration." });
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
    const { username, dob, savings } = req.body;

    try {
      let photoUrl;

      if (req.file) {
        photoUrl = await uploadToCloud(req.file, "profile-pictures");
      } else {
        photoUrl = null;
      }

      const updates = {
        username,
        dob: dob ? dob.toString() : existingUser.dob,
        savings: savings ? parseFloat(savings) : existingUser.savings,
        photoUrl,
      };

      const result = await userModel.updateUserDetails(userId, updates);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error during profile update:", error);
      res
        .status(500)
        .json({ message: "An error occurred while updating the profile." });
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

  async deleteUser(req, res) {
    const { userId, email } = req.user;

    try {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await userModel.deleteUserResources(userId);

      res.status(200).json({ message: "Delete user successful!" });
    } catch (error) {
      console.error("deleteUser: Terjadi kesalahan saat penghapusan:", error);
      res.status(500).json({ message: "An error occurred during deletion." });
    }
  },
};

module.exports = userController;
