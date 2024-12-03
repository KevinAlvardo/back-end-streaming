
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // Importar rutas de autenticación
const contentRoutes = require('./routes/content'); // Importar rutas de contenido
const swaggerDocs = require('./swagger');

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes); // Rutas para autenticación
app.use('/content', contentRoutes); // Rutas para contenido

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});

swaggerDocs(app); // Documentación de la API