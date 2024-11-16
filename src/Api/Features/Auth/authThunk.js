import { createAsyncThunk } from "@reduxjs/toolkit";
import { signup ,login,forgotPasswordApi,verifyResetCodeApi ,resetPasswordApi} from './authApi';

export const signupThunk = createAsyncThunk('Auth/Signup', async (userData, { rejectWithValue }) => {
  try {
  
    const data = await signup(userData);
    if (data) {
      return data;
    }
    return rejectWithValue('No data found');
  } catch (error) {
   
    const errors = error.response?.data?.errors || [{ msg: 'An unknown error occurred' }];
    return rejectWithValue(errors);
  }
});


export const loginThunk = createAsyncThunk('Auth/Login', async (userData, { rejectWithValue }) => {
  try {
    const data = await login(userData);
    if (data.token) {
      localStorage.setItem("authToken", data.token); 
      localStorage.setItem("username", data.username); 
    }
    return data;
  } catch (error) {
    const errorMessage = error.message || "Failed to login due to an unknown error";
    return rejectWithValue([{ msg: errorMessage }]); // إرسال الرسالة ككائن داخل مصفوفة
  }
});

export const forgotPasswordThunk = createAsyncThunk(
  'Auth/ForgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const data = await forgotPasswordApi(email);
      return data; 
    } catch (error) {
      const errorMessage = error.message || "Failed to request password reset due to an unknown error";
      return rejectWithValue([{ msg: errorMessage }]); 
    }
  }
);


export const verifyResetCodeThunk = createAsyncThunk(
  'auth/verifyResetCode',
  async (resetCode, { rejectWithValue }) => {
    try {
      const data = await verifyResetCodeApi(resetCode);
      return data;
    } catch (error) {
      const errorMessage = error.message || "Failed to request password reset due to an unknown error";
      return rejectWithValue([{ msg: errorMessage }]); 
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const data = await resetPasswordApi({ email, newPassword });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
