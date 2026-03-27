const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video');

dotenv.config();

const seedVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackathon_ott');
    console.log('Connected to MongoDB');
    
    const movies = [
      {
        title: 'Tears of Steel',
        description: 'A sci-fi short film focusing on a group of warriors and scientists.',
        genre: 'Sci-Fi',
        releaseYear: 2012,
        duration: '12 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        category: 'Sci-Fi'
      },
      {
        title: 'For Bigger Blazes',
        description: 'An advertisement short film about enjoying multimedia content.',
        genre: 'Action',
        releaseYear: 2015,
        duration: '5 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        category: 'Action'
      },
      {
        title: 'For Bigger Escape',
        description: 'Another high-quality advertisement short focusing on escape and adventure.',
        genre: 'Adventure',
        releaseYear: 2016,
        duration: '7 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        category: 'Adventure'
      },
      {
        title: 'Sintel',
        description: 'A beautifully animated fantasy short film about a girl and her dragon.',
        genre: 'Drama',
        releaseYear: 2010,
        duration: '15 min',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        category: 'Drama'
      }
    ];

    await Video.updateMany(
      { thumbnailUrl: { $regex: 'wikimedia' } },
      { $set: { thumbnailUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b' } }
    );

    for (const m of movies) {
      await Video.create(m);
    }
    
    console.log('Seeded 4 new videos and fixed broken thumbnails successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
};

seedVideos();
