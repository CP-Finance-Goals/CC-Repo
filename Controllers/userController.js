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
        return res.status(400).json({ message: "Email sudah digunakan!" });
      }

      const newUser = await userModel.createUser(email, password);
      res.status(201).json({ message: "Registrasi berhasil!", user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat registrasi." });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Email tidak ditemukan!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password salah!" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY
      );
      res.status(200).json({ message: "Login berhasil!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan saat login." });
    }
  },

  async updateDetails(req, res) {
    const { userId } = req.user;
    const { username, gender, dob } = req.body;
    let profilePicUrl = null;

    if (req.file) {
      console.log("file diterima");
      profilePicUrl = await uploadToCloud(req.file, "profile-pictures");
    }

    const updates = {
      username,
      gender,
      dob,
      profilePicUrl,
    };

    try {
      const result = await userModel.updateUserDetails(userId, updates);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  async getProfile(req, res) {
    const { id } = req.user;

    try {
      const userRef = db.collection("users").doc(id);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
      }

      res.status(200).json({ user: userDoc.data() });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengambil profil." });
    }
  },

  async getData(req, res) {
    const { userId } = req.user;
    try {
      const result = await userModel.getAllData(userId.toString());
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
