import axios from "axios";
import type { Product } from "../types/product";

const API = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${API}/products`);
  return data;
};

export const getCategories = async (): Promise<string[]> => {
  const { data } = await axios.get(`${API}/products/categories`);
  return data;
};
