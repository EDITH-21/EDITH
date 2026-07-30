const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edith_db');
    console.log(`[EDITH Backend] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[EDITH Backend] MongoDB Connection Error: ${error.message}`);
    // Non-fatal fallback for development demo mode if local mongo isn't active
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
