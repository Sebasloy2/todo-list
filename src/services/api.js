import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password });
  return response.data;
};

export const getLists = async (token) => {
  const response = await axios.get(`${BASE_URL}/lists`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const createList = async (token, title) => {
  const response = await axios.post(`${BASE_URL}/lists`, { title }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteList = async (token, listId) => {
  const response = await axios.delete(`${BASE_URL}/lists/${listId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const createListItem = async (token, listId, description) => {
  const response = await axios.post(`${BASE_URL}/lists/${listId}/items`, { description }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const updateListItem = async (token, listId, itemId, completed) => {
  const response = await axios.patch(`${BASE_URL}/lists/${listId}/items/${itemId}`, { completed }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

export const deleteListItem = async (token, listId, itemId) => {
  const response = await axios.delete(`${BASE_URL}/lists/${listId}/items/${itemId}`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};
