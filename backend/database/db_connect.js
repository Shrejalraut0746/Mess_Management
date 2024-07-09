import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
  console.log("connected to mongoDB successfully");
  const url = process.env.DATABASE;
  await mongoose.connect(url)
    .then(() => {
      console.log("connection successful");
    })
    .catch((e) => {
      console.log('Error of DB: ', e);
    });
};

export default Connection;
