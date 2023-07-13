import { atomWithImmer } from "jotai-immer";

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
  discountPercentage: number;
}

export interface IResponse {
  products: IProduct[] | [];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductAtom extends IResponse {
  loading: boolean;
}

const initialState = {
  products: [],
  total: 0,
  skip: 0,
  limit: 0,
  loading: true,
};

export const productsAtom = atomWithImmer<IProductAtom>(initialState);
