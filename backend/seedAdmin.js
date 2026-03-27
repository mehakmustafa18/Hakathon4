const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existing = await User.findOne({ email: 'admin@streamvibe.com' });
    if (existing) {
      console.log('Admin already exists:');
      console.log(`  Email: admin@streamvibe.com`);
      console.log(`  Role: ${existing.role}`);
      process.exit(0);
    }

    // Create super_admin user
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@streamvibe.com',
      password: 'admin123',
      role: 'super_admin',
      subscriptionPlan: 'active'
    });

    console.log('✅ Admin user created successfully!');
    console.log('─────────────────────────────');
    console.log(`  Email:    admin@streamvibe.com`);
    console.log(`  Password: admin123`);
    console.log(`  Role:     super_admin`);
    console.log('─────────────────────────────');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
