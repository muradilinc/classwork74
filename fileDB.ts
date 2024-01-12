import {promises as fs} from 'fs';
import {Product, ProductWithoutId} from "./types";
import crypto from "crypto";

const filename = './db.json';
let data: Product[] = [];

const fileDB = {
  async init() {
    try {
      const fileContent = await fs.readFile(filename);
      data = JSON.parse(fileContent.toString());
    } catch (e) {
      data = [];
    }
  },
  async getItems() {
    return data;
  },
  async addItem(item: ProductWithoutId) {
    const id = crypto.randomUUID();
    const product = {id, ...item};
    data.push(product);
    await this.save();

    return product;
  },
  async save() {
    return fs.writeFile(filename, JSON.stringify(data));
  }
}

export default fileDB;