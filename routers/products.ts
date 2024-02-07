import {Router} from "express";
const productsRouter = Router();
import fileDB from "../fileDB";
import {ProductWithoutId} from "../types";
import {imageUpload} from "../multer";

productsRouter.post('/', imageUpload.single('image'), async (req, res) => {
  const product: ProductWithoutId = {
    title: req.body.title,
    price: parseFloat(req.body.price),
    description: req.body.description,
    image: req.file ? req.file.filename : null,
  };

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
