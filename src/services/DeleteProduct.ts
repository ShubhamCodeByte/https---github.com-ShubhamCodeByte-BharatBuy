import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

/**
 * Delete a product from the store.
 * @param productId - The ID of the product to delete.
 * @returns Response data after deletion.
 */
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${productId}`);
    console.log("Product deleted:", response.data);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
