import express from 'express';
import productsRouter from "./routers/products";
// import fileDB from "./fileDB";
import cors from 'cors';
import mongoose from 'mongoose';
import config from "./config";
import categoriesRouter from "./routers/categories";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);

const run = async () => {
  // await fileDB.init();
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();