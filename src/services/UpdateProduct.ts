import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

/**
 * Update an existing product.
 * @param productId - The ID of the product to update.
 * @param updatedProduct - The updated product data.
 * @returns The updated product data.
 */
export const updateProduct = async (productId: number, updatedProduct: { title: string; price: number }) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, updatedProduct);
    console.log("Product updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
