import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await axios.post(API_URL, contact);
  return response.data;
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (contact) => {
  const response = await axios.put(`${API_URL}/${contact.id}`, contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});