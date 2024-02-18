'use server'

import axiosInstance from "../../../utils/axiosInstance";
 
export async function authenticate(formData: FormData) {
  try {
      const response = await axiosInstance.post("/login", FormData);

      if (response.status === 200) {
        const token = response.data.authToken;
        localStorage.setItem("authToken", token);
      
        console.log("Login successful!");
      } else {
        console.log("Login failed!");
      }

  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}