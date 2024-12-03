const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Almacena la información del usuario en la solicitud
        next(); // Pasa al siguiente middleware o ruta
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

