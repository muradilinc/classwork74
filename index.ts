import express from 'express';
import productsRouter from "./routers/products";
import fileDB from "./fileDB";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/products', productsRouter);

const run = async () => {
  await fileDB.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
}

void run();