import { configureStore } from '@reduxjs/toolkit';
import emailReducer from '../features/email/emailSlice'
import emailBodyReducer from '../features/emailBody/emailBodySlice'

export const store = configureStore({
  reducer: {
    emails: emailReducer,
    emailBody:emailBodyReducer
  },
});
