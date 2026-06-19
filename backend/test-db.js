import mongoose from 'mongoose';

const uri = 'mongodb+srv://negashabdi85_db_user:CYcpI35vMEOR0pd8@arcitecture.vir12ou.mongodb.net/architectai?retryWrites=true&w=majority';

console.log('Testing connection...');
console.log('URI:', uri.replace(/:([^@]+)@/, ':****@'));

mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ Connected successfully!');
  process.exit(0);
})
.catch(err => {
  console.error('❌ Error:', err.message);
  console.error('Full error:', err);
  process.exit(1);
});
