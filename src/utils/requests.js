import api from "./api";

export const getProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err.message);
    throw err;
  }
};
export const getProducts = async (id) => {
  try {
    const res = await api.get(`/products`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err.message);
    throw err;
  }
};
export const getProd = async (order) => {
  try {
    const res = await api.get(`/products?sortBy=title&order=${order}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err.message);
    throw err;
  }
};