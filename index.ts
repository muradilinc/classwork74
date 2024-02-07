import express from 'express';
import productsRouter from "./routers/products";
import fileDB from "./fileDB";
import cors from 'cors';
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/products', productsRouter);

const run = async () => {
  await fileDB.init();
  await mongoDb.connect();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
  process.on('exit', () => {
    mongoDb.disconnect();
  });
};

void run();