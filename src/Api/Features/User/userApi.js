import baseUrl from "../../BaseUrl";

export const getUserProfileApi = async () => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      console.error("Error: No auth token found. Please login first.");
      throw new Error("Authentication token is missing. Please log in.");
    }
  
    try {
      const response = await baseUrl.get(`api/v1/auth/getmydata`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: Unexpected response status ${response.status}`);
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to get User Data";
      console.error("Error: Failed to get user data", errorMessage);
      throw new Error(errorMessage);
    }
  };

export const updateUserProfileApi = async (userData) => {
    const authToken = localStorage.getItem("authToken");
    console.log("Data being sent:", userData);
  
    if (!authToken) {
      console.error("Error: No auth token found. Please login first.");
      throw new Error("Authentication token is missing. Please log in.");
    }
  
    try {
      const response = await baseUrl.put(`api/v1/auth/updatemydata`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error: Unexpected response status ${response.status}`);
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to Update User Data";
      console.error("Error: Failed to Update user data", errorMessage);
      throw new Error(errorMessage);
    }
  };

  export const updateUserPasswordApi = async (currentPassword, newPassword, passwordConfirm) => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      throw new Error("Authentication token is missing. Please log in.");
    }
  
    try {
      const response = await baseUrl.put(
        `api/v1/auth/updatemypassword`, // تأكد من صحة المسار هنا
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
          passwordConfirm: passwordConfirm,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update password";
      throw new Error(errorMessage);
    }
  };
  