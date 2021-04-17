import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { config as dotenv } from "dotenv";

dotenv();

const mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  await mongoose.disconnect();

  const mongoUri = (process.env.DATABASE_TESTING == '1') 
    ? await mongoServer.getUri() 
    : process.env.DATABASE_URL;
  
  await mongoose.connect(mongoUri, opts, err => {
    if (err) { console.error(err); }
  });
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  if(process.env.DATABASE_TESTING != '1') {
    throw new Error("Não é possível limpar em um banco que não é de testes.");
  }
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export default {
  connect,
  close,
  clear
};