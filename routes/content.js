const express = require('express');
const geoip = require('geoip-lite');
const Content = require('../models/content');
const User = require('../models/user'); // Modelo de usuario
const authMiddleware = require('../middleware/aut');
const router = express.Router();






// Obtener contenido recomendado
router.post('/recommendations', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Obtén el ID del usuario autenticado
        const { preferences, location } = req.body;

        // Obtener región basada en la IP o 'US' por defecto
        const region = geoip.lookup(location)?.country || 'US';

        let recommendations = [];

        if (preferences && preferences.length > 0) {
            // Recomendaciones basadas en preferencias directas del usuario
            recommendations = await Content.find({
                genre: { $in: preferences },
                regionAvailability: region,
            });
        } else {
            // Si no hay preferencias directas, basarse en el historial de visualización
            const user = await User.findById(userId).populate('history.contentId');
            const watchedGenres = user.history.map((entry) => entry.genre).flat();

            if (watchedGenres.length > 0) {
                // Basarse en los géneros vistos
                recommendations = await Content.find({
                    genre: { $in: watchedGenres },
                    regionAvailability: region,
                });
            }
        }

        // Si aún no hay recomendaciones, mostrar tendencias globales/regionales
        if (recommendations.length === 0) {
            recommendations = await Content.find({
                regionAvailability: region,
            }).sort({ views: -1 }).limit(10); // Contenido más popular
        }

        res.json(recommendations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
// Ver tráiler
router.get('/trailer/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Usuario autenticado
        const content = await Content.findById(req.params.id);

        if (!content) return res.status(404).json({ error: 'Content not found' });

        // Agregar al historial del usuario
        const user = await User.findById(userId);
        user.history.push({
            contentId: content._id,
            genre: content.genre,
        });
        await user.save();

        res.json({ trailerUrl: content.trailerUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
