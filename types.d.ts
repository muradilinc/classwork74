import {Model} from "mongoose";

export interface ProductMutation {
  category: string;
  title: string;
  price: number;
  description: string;
  image: string | null;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<Boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;