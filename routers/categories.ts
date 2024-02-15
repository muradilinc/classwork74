import { Router } from 'express';
import Category from '../models/Category';
import mongoose, { mongo } from 'mongoose';

const categoriesRouter = Router();

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData = {
      title: req.body.title,
      description: req.body.description,
    };

    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error.message);
    }
    if (error instanceof mongo.MongoServerError && error.code === 11000) {
      return res.status(422).send(error.message);
    }
    return next(error);
  }
});

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (error) {
    return next(error);
  }
});

export default categoriesRouter;
