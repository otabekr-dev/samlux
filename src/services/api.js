const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getProducts: () => get('/api/products/'),
  getProduct: (slug) => get(`/api/products/${slug}`),
  getCategories: () => get('/api/category/'),
  getCategory: (slug) => get(`/api/category/${slug}`),
  getCompany: () => get('/api/company/'),
};
