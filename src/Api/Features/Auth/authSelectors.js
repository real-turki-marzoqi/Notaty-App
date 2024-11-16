export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export const selectAuthToken = (state) => state.auth.token; 
export const selectUserName = (state) => state.auth.userName; 
 
// forgot passwords selectors
export const selectForgotPasswordStatus = (state) => state.auth.forgotPasswordStatus;
export const selectForgotPasswordError = (state) => state.auth.forgotPasswordError;

// verfiy reset code
export const selectVerifyResetCodeStatus= (state) => state.auth.verifyResetCodeStatus;
export const selectVerifyResetCodeError = (state) => state.auth.verifyResetCodeError;

export const selectResetPasswordStatus = (state) => state.auth.resetPasswordStatus;
export const selectResetPasswordError = (state) => state.auth.resetPasswordError;