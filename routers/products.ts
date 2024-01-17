import {Router} from "express";
const productsRouter = Router();
import fileDB from "../fileDB";
import {ProductWithoutId} from "../types";

productsRouter.post('/', async (req, res) => {
  const product: ProductWithoutId = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  }

  const newProduct = await fileDB.addItem(product);
  res.send(newProduct);
});

productsRouter.get('/',  async (req, res) => {
  const products = await fileDB.getItems();
  res.send(products);
});

productsRouter.get('/:id', async (req, res) => {
  const products = await fileDB.getItems();
  const product = products.find(p => p.id === req.params.id);
  res.send(product);
});

export default productsRouter;
