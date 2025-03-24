import axios from "axios";
import { Product ,ProductRatingQuantity } from "../types/Product";

export const GetProductList = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const GetProductListWithRating = async (): Promise<ProductRatingQuantity[]> => {
  try {
    const response = await axios.get<ProductRatingQuantity[]>("https://fakestoreapi.com/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};