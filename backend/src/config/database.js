import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name || 'default'}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Error code:', error.code);
    console.error('Error codeName:', error.codeName);
    
    if (error.message.includes('bad auth')) {
      console.error('');
      console.error('=== TROUBLESHOOTING ===');
      console.error('1. Check username/password in MongoDB Atlas Database Access');
      console.error('2. Make sure user has "Read and write to any database" role');
      console.error('3. Whitelist your IP: Network Access → Add IP Address → 0.0.0.0/0');
      console.error('4. Try resetting password in Atlas');
    }
    
    process.exit(1);
  }
};
