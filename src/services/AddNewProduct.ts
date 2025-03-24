import axios from "axios";
import { ProductRatingQuantity } from "../types/Product";

const API_URL = "https://fakestoreapi.com/products";

/**
 * Add a new product to the store.
 * @param product - The product details to add.
 * @returns Newly created product data.
 */
export const addNewProduct = async (product: ProductRatingQuantity): Promise<ProductRatingQuantity> => {
  try {
    const response = await axios.post<ProductRatingQuantity>(API_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
