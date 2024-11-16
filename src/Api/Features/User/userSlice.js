import { getUserProfileThunk, updateUserProfileThunk, updateUserPasswordThunk } from "./userThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  getUserDataStatus: "idle",
  getUserDataError: null,
  
  updateUserProfileStatus: "idle",
  updateUserProfileError: null,

  updateUserPasswordStatus: "idle",
  updateUserPasswordError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUpdateUserProfileStatus: (state) => {
      state.updateUserProfileStatus = "idle";
      state.updateUserProfileError = null;
    },
    resetUpdateUserPasswordStatus: (state) => {
      state.updateUserPasswordStatus = "idle";
      state.updateUserPasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // حالات استرجاع بيانات المستخدم
      .addCase(getUserProfileThunk.pending, (state) => {
        state.getUserDataStatus = "loading";
        state.getUserDataError = null;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.getUserDataStatus = "succeeded";
        state.userData = action.payload || {};
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.getUserDataStatus = "failed";
        state.getUserDataError = action.payload?.[0]?.msg || "Failed to load user data";
        state.userData = null;
      })
      
      // حالات تعديل بيانات المستخدم
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.updateUserProfileStatus = "loading";
        state.updateUserProfileError = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.updateUserProfileStatus = "succeeded";
        state.userData = action.payload || {}; // تحديث بيانات المستخدم بنجاح
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.updateUserProfileStatus = "failed";
        state.updateUserProfileError = action.payload || "Failed to update user data";
      })
      
      // حالات تحديث كلمة المرور
      .addCase(updateUserPasswordThunk.pending, (state) => {
        state.updateUserPasswordStatus = "loading";
        state.updateUserPasswordError = null;
      })
      .addCase(updateUserPasswordThunk.fulfilled, (state) => {
        state.updateUserPasswordStatus = "succeeded";
      })
      .addCase(updateUserPasswordThunk.rejected, (state, action) => {
        state.updateUserPasswordStatus = "failed";
        state.updateUserPasswordError = action.payload || "Failed to update password";
      });
  },
});

export const { resetUpdateUserProfileStatus, resetUpdateUserPasswordStatus } = userSlice.actions; 
export default userSlice.reducer;
