const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = verificarToken;