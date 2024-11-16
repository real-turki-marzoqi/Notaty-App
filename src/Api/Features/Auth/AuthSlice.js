import { createSlice } from "@reduxjs/toolkit";
import {
  signupThunk,
  loginThunk,
  forgotPasswordThunk,
  verifyResetCodeThunk,
  resetPasswordThunk,
} from "./authThunk";

const initialState = {
  userInfo: null,
  token: localStorage.getItem("authToken") || null,
  userName: localStorage.getItem("username") || null,
  error: null,
  status: "idle",

  forgotPasswordStatus: "idle",
  forgotPasswordError: null,

  verifyResetCodeStatus: "idle",
  verifyResetCodeError: null,

  resetPasswordStatus: "idle",
  resetPasswordError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.userName = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
    },
    resetVerifyResetCodeStatus: (state) => {
      state.verifyResetCodeStatus = "idle";
      state.verifyResetCodeError = null;
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = "idle";
      state.resetPasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signup
      .addCase(signupThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle login
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.userName = action.payload.username;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("username", action.payload.username);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle forgot password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.forgotPasswordStatus = "loading";
        state.forgotPasswordError = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.forgotPasswordStatus = "succeeded";
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.forgotPasswordError = action.payload;
      })

      // Handle verify reset code
      .addCase(verifyResetCodeThunk.pending, (state) => {
        state.verifyResetCodeStatus = "loading";
        state.verifyResetCodeError = null;
      })
      .addCase(verifyResetCodeThunk.fulfilled, (state) => {
        state.verifyResetCodeStatus = "succeeded";
      })
      .addCase(verifyResetCodeThunk.rejected, (state, action) => {
        state.verifyResetCodeStatus = "failed";
        state.verifyResetCodeError = action.payload;
      })

      // Handle reset password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.resetPasswordStatus = "loading";
        state.resetPasswordError = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.resetPasswordStatus = "succeeded";
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.resetPasswordError = action.payload;
      });
  },
});

export const { logout, resetVerifyResetCodeStatus, resetResetPasswordStatus } = authSlice.actions;
export default authSlice.reducer;
