const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetTrials = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hackathon_ott');
    console.log('Connected to MongoDB');

    const result = await User.updateMany(
      { subscriptionPlan: 'free_trial' },
      { $set: { subscriptionPlan: 'none' } }
    );
    
    console.log(`Reset ${result.modifiedCount} users from free_trial to none.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

resetTrials();
