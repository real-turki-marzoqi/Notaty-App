import {getUserProfileApi,updateUserProfileApi,updateUserPasswordApi} from '../User/userApi'
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUserProfileThunk = createAsyncThunk(
    'User/GetUserProfile',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getUserProfileApi();
        return data;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An unknown error occurred";
        console.error("Error fetching user profile:", errorMessage);
        return rejectWithValue([{ msg: errorMessage }]);
      }
    }
  );

  export const updateUserProfileThunk = createAsyncThunk(
    "User/updateUserProfile",
    async (userData, { rejectWithValue }) => {
      try {
        const data = await updateUserProfileApi(userData);
        return data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred";
        console.error("Error updating user profile:", errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  );



  
  export const updateUserPasswordThunk = createAsyncThunk(
    "User/updateUserPassword",
    async ({ currentPassword, newPassword, passwordConfirm }, { rejectWithValue }) => {
      try {
        const data = await updateUserPasswordApi(currentPassword, newPassword, passwordConfirm);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  