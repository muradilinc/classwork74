import {Router} from "express";
const productsRouter = Router();
import fileDB from "../fileDB";
import {ProductMutation} from "../types";
import {imageUpload} from "../multer";
import Product from "../models/products";
import mongoose, {ObjectId, Types} from "mongoose";

productsRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
  try {
    const productData: ProductMutation = {
      category: req.body.category,
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      image: req.file ? req.file.filename : null,
    };

    const newProduct = await fileDB.addItem(productData);

    const product = new Product(productData);
    await product.save();
    res.send(productData);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.send(422).send(error.message);
    }
    return next(error);
  }
});

productsRouter.get('/',  async (_req, res) => {
  const products = await fileDB.getItems();
  const results = await Product.find().populate('category', 'title description');
  res.send(results);
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id: Types.ObjectId;
    try {
      _id = new Types.ObjectId(req.params.id as string);
    } catch {
      return res.status(404).send({error: 'Wrong objectID'});
    }
    const products = await fileDB.getItems();
    const product = products.find(p => p.id === req.params.id);
    const result = await Product.findOne({_id});
    res.send(result);
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
