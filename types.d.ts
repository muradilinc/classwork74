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
}