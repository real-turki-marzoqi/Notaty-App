
export const selectUserData = (state)=>state.user.userData

// get user Data
export const selectGetUserDataStatus = (state)=>state.user.getUserDataStatus
export const selectGetUserDataError = (state)=>state.user.getUserDataError
 

// update user Data 
export const selectupdateUserDataStatus = (state)=>state.user.updateUserProfileStatus
export const selectUpdateUserDataError = (state)=>state.user.UserProfileError


// update user password 
export const selectUpdateUserPasswordStatus = (state)=>state.user.updateUserPasswordStatus
export const selectUpdateUserPasswordError = (state)=>state.user.updateUserPasswordError