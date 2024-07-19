import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './contactActions';
import { addContact } from './contactActions';
import { updateContact } from './contactActions';
import { deleteContact } from './contactActions';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
        state.contacts[index] = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
      });
  }
});

export default contactsSlice.reducer;