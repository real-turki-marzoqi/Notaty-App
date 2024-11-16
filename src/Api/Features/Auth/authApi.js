import baseUrl from "../../BaseUrl";

export const signup = async (userData) => {
  try {
  
    const response = await baseUrl.post("api/v1/auth/signup", userData);
    
    if (response.status === 201) {
     
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error: Signup failed", error);
    throw error;
  }
};

export const login = async (userData)=>{

  try {
    const response = await baseUrl.post("api/v1/auth/login", userData);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    
    const errorMessage = error.response?.data?.message || "Login failed due to an unknown error";
    console.error("Error: Login failed", errorMessage);
    throw new Error(errorMessage);
  }
}

export const forgotPasswordApi = async (email) => {
  try {
    // إرسال البريد كسلسلة نصية مباشرة فقط
    const response = await baseUrl.post("api/v1/auth/forgotpassword", email); 
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Forgot password request failed due to an unknown error";
    console.error("Error: Forgot password request failed", errorMessage);
    throw new Error(errorMessage);
  }
};


export const verifyResetCodeApi = async (resetCode) => {
  try {
    const response = await baseUrl.post("api/v1/auth/verifyresetcode",  {resetCode} );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Verification failed due to an unknown error";
    console.error("Error: Verification failed", errorMessage);
    throw new Error(errorMessage);
  }
};



export const resetPasswordApi = async ({ email, newPassword }) => {
  try {
    const response = await baseUrl.put("api/v1/auth/resetpassword", { email, newPassword });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Password reset failed";
    console.error("Error: Password reset failed", errorMessage);
    throw new Error(errorMessage);
  }
};