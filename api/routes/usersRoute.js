const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();

/* --- USERS --- */
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

router.post("/user/addUser", async (req, res) => {
  // res.send("user - ajouter un utilisateur");
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/user/:id", async (req, res) => {
  // res.send("user - récupérer l'ID");
  // const userId = req.params.id;
  // res.send("User ID: " + userId);
  const userId = req.params.id;
  const connectedUserId = req.session.userId;

  console.log("userId:", userId);
  console.log("connectedUserId:", connectedUserId);
  console.log("userId.length:", userId.length);
  console.log("connectedUserId.length:", connectedUserId.length);

  if (userId === connectedUserId) {
    try {
      const user = await User.findById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(403).send("Forbidden");
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const newPassword = req.body.newPassword;

    // Vérifiez que le nouveau mot de passe est fourni
    if (!newPassword) {
      return res.status(400).send("Veuillez fournir un nouveau mot de passe");
    }

    // Trouvez l'utilisateur dans la base de données
    const user = await User.findById(userId);

    // Vérifiez si l'utilisateur existe
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }

    // Hashage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Ajouter cette ligne

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = hashedPassword;
    await user.save();
    res.json("Mot de passe mis à jour avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur lors de la mise à jour du mot de passe");
  }
});

router.post("/user/login", async (req, res) => {
  // res.send("user - pour se connecter");
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compare(password, user.password)) {
      // Stocker l'ID d'utilisateur dans la session
      req.session.userId = user._id;
      console.log("User ID stored in session:", req.session.userId);
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Middleware pour vérifier si l'utilisateur est connecté
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

// API pour les utilisateurs connectés uniquement
router.get("/user/protected", isAuthenticated, (req, res) => {
  res.send("Welcome to the protected area");
});

router.post("/user/logout", (req, res) => {
  // res.send("user - pour la déconexion")
  req.session.userId = null;
  console.log("déconnecter");
  res.status(200).send("Logout successful");
});

module.exports = router;
