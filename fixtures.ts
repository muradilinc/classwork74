import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import Product from './models/products';
import User from './models/User';
import crypto from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'products', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [cpuCategory, ssdCategory] = await Category.create(
    {
      title: 'CPUs',
      description: 'Central Processing Units',
    },
    {
      title: 'SSDs',
      description: 'Solid State Drives',
    },
  );

  await Product.create(
    {
      title: 'Intel Core i7 12700K',
      price: 350,
      category: cpuCategory,
      image: 'fixtures/cpu.jpg',
    },
    {
      title: 'Samsung 990 Pro 1TB',
      price: 170,
      category: ssdCategory,
      image: 'fixtures/ssd.jpg',
    },
  );

  await User.create({
    username: 'user',
    password: 'muradil02',
    token: crypto.randomUUID(),
  });

  await db.close();
};

void run();
