import axios from "axios";

export async function fetchProducts(limit) {
  try {
    return await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
}

export async function fetchProduct(id) {
  try {
    return await axios.get(`https://fakestoreapi.com/products/${id}`);
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
}

export async function addProduct(data) {
  try {
    return await axios.post(`https://fakestoreapi.com/products`, { data });
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
}

export async function updateProduct(id, data) {
  try {
    return await axios.put(`https://fakestoreapi.com/products/${id}`, { data });
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    return await axios.delete(`https://fakestoreapi.com/products/${id}`);
  } catch (error) {
    if (error.response) {
      throw error.response;
    }
    throw error;
  }
}
