const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video');

dotenv.config();

const addDummyReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackathon_ott');
    console.log('Connected to MongoDB');

    const reviewsToSeed = [
      {
        name: 'Aniket Roy',
        location: 'India',
        rating: 4.5,
        text: 'This movie was recommended to me by a very dear friend who went for the movie by herself. I went to the cinemas to watch but had a houseful board so couldn\'t watch it.'
      },
      {
        name: 'Swaraj',
        location: 'India',
        rating: 5,
        text: 'A restless king promises his lands to the local tribals in exchange of a stone (Panjurli, a deity of Keradi Village) wherein he finds solace and peace of mind.'
      }
    ];

    const videos = await Video.find({ title: { $in: ['Tears of Steel', 'Sintel', 'For Bigger Blazes', 'Big Buck Bunny'] } });
    
    for (const vid of videos) {
      if (vid.reviews.length === 0) {
        vid.reviews.push(...reviewsToSeed);
        await vid.save();
      }
    }

    console.log('Dummy reviews added to videos successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding reviews:', err);
    process.exit(1);
  }
};

addDummyReviews();
