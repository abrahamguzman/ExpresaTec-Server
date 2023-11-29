const db = require("../models/index.js"); // Assuming you have a "Usuario" model defined
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.user.findOne({
      where: {
        username: username,
        password: password
      }
    });

    if (!user) {
      return res.status(401).json({ mensaje: "Credenciales inválidas" });
    }

    const token = generateToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });
  return token;
};

exports.register = async (req, res) => {

}