const mongoose = require('mongoose');
const Content = require('./models/content');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');

const seedData = async () => {
    await connectDB();

    const content = [
        {
            title: 'Inception',
            genre: ['Sci-Fi', 'Thriller'],
            trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Parasite',
            genre: ['Drama', 'Thriller'],
            trailerUrl: 'https://www.youtube.com/watch?v=SEUXfv87Wpk',
            regionAvailability: ['AS', 'EU'],
        },
        {
            title: 'The Dark Knight',
            genre: ['Action', 'Crime'],
            trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Interstellar',
            genre: ['Sci-Fi', 'Adventure'],
            trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Avengers: Endgame',
            genre: ['Action', 'Sci-Fi'],
            trailerUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'The Matrix',
            genre: ['Sci-Fi', 'Action'],
            trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Joker',
            genre: ['Drama', 'Crime'],
            trailerUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Titanic',
            genre: ['Romance', 'Drama'],
            trailerUrl: 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Coco',
            genre: ['Animation', 'Family'],
            trailerUrl: 'https://www.youtube.com/watch?v=Rvr68u6k5sI',
            regionAvailability: ['US', 'AS'],
        },
        {
            title: 'The Lion King',
            genre: ['Animation', 'Adventure'],
            trailerUrl: 'https://www.youtube.com/watch?v=7TavVZMewpY',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Frozen',
            genre: ['Animation', 'Family'],
            trailerUrl: 'https://www.youtube.com/watch?v=TbQm5doF_Uc',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Toy Story',
            genre: ['Animation', 'Comedy'],
            trailerUrl: 'https://www.youtube.com/watch?v=KYz2wyBy3kc',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Black Panther',
            genre: ['Action', 'Sci-Fi'],
            trailerUrl: 'https://www.youtube.com/watch?v=xjDjIWPwcPU',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Spider-Man: No Way Home',
            genre: ['Action', 'Adventure'],
            trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Shrek',
            genre: ['Animation', 'Comedy'],
            trailerUrl: 'https://www.youtube.com/watch?v=W37DlG1i61s',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'The Shawshank Redemption',
            genre: ['Drama', 'Crime'],
            trailerUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'Forrest Gump',
            genre: ['Drama', 'Romance'],
            trailerUrl: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'Gladiator',
            genre: ['Action', 'Drama'],
            trailerUrl: 'https://www.youtube.com/watch?v=owK1qxDselE',
            regionAvailability: ['US', 'EU'],
        },
        {
            title: 'The Godfather',
            genre: ['Crime', 'Drama'],
            trailerUrl: 'https://www.youtube.com/watch?v=sY1S34973zA',
            regionAvailability: ['US', 'EU', 'AS'],
        },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            genre: ['Adventure', 'Fantasy'],
            trailerUrl: 'https://www.youtube.com/watch?v=V75dMMIW2B4',
            regionAvailability: ['US', 'EU'],
        },
    ];

    try {
        await Content.deleteMany(); // Limpia la colección
        await Content.insertMany(content);
        console.log('Seed data inserted successfully');
        process.exit();
    } catch (err) {
        console.error('Error inserting seed data:', err.message);
        process.exit(1);
    }
};

seedData();
