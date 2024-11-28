const bcrypt = require("bcrypt");
const db = require("../Config/database");

const userModel = {
  async createUser(email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const snapshot = await db.collection("users").get();
    const newId = snapshot.size + 1;
    const userRef = db.collection("users").doc(newId.toString());

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email already used");
    }

    await userRef.set({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Tambahkan detail user
    const userDetailsRef = userRef.collection("userItems").doc("userProfile");
    await userDetailsRef.set({
      userId: newId, // Simpan sebagai integer
      email,
      point: 0,
      createdAt: new Date(),
    });

    return { id: newId, email };
  },

  async getUserByEmail(email) {
    if (!email) {
      throw new Error("Email is required");
    }

    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) return null;

    const userDoc = snapshot.docs[0];
    return { id: parseInt(userDoc.id, 10), ...userDoc.data() };
  },

  async updateUserDetails(userId, updates) {
    const id = userId.toString();
    const userRef = db.collection("users").doc(id);
    const userDetailsRef = userRef.collection("userItems").doc("userProfile");

    const detailsDoc = await userDetailsRef.get();
    if (!detailsDoc.exists) {
      throw new Error("User details not found");
    }

    // Merge data baru dengan data lama
    await userDetailsRef.set(updates, { merge: true });

    return { message: "User details has been updated" };
  },

  async getAllData(userId) {
    try {
      const userRef = db.collection("users").doc(userId);

      // Verifikasi dokumen user ada
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      // Ambil semua subcollection
      const subcollections = await userRef.listCollections();

      const subcollectionData = {};
      for (const subcollection of subcollections) {
        const subcollectionName = subcollection.id;

        // Ambil semua dokumen dalam subcollection
        const snapshot = await subcollection.get();
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        subcollectionData[subcollectionName] = docs; // Simpan data ke hasil
      }

      return subcollectionData;
    } catch (error) {
      console.error("Error fetching subcollections:", error);
      throw error;
    }
  },
};

module.exports = userModel;
