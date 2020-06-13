import mongoose from 'mongoose';
import chalk from 'chalk';

const isProduction = process.env.NODE_ENV === 'production';
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

mongoose.connect(`${dbConnection}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected: ${chalk.cyan('https://cloud.mongodb.com/v2/5e4d7b4366f371102c022635')}`);
});
