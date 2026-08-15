// API helper functions
const API_URL = '/api';

async function apiRequest(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    ...options,
    headers,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

// Auth
async function login(email, password) {
  return apiRequest(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async function register(name, email, password) {
  return apiRequest(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

async function getProfile() {
  return apiRequest(`${API_URL}/auth/profile`);
}

// Products
async function getProducts() {
  return apiRequest(`${API_URL}/products`);
}

async function getProduct(id) {
  return apiRequest(`${API_URL}/products/${id}`);
}

// Cart
async function getCart() {
  return apiRequest(`${API_URL}/cart`);
}

async function addToCart(productId, quantity = 1) {
  return apiRequest(`${API_URL}/cart`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

async function updateCartItem(itemId, quantity) {
  return apiRequest(`${API_URL}/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

async function removeCartItem(itemId) {
  return apiRequest(`${API_URL}/cart/${itemId}`, {
    method: 'DELETE',
  });
}

async function clearCart() {
  return apiRequest(`${API_URL}/cart`, {
    method: 'DELETE',
  });
}

// Orders
async function createOrder() {
  return apiRequest(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

async function getOrders() {
  return apiRequest(`${API_URL}/orders`);
}

async function getOrder(id) {
  return apiRequest(`${API_URL}/orders/${id}`);
}
