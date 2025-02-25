import axios from "axios";
import { setUser } from "../store/authSlice";
import { useDispatch } from "react-redux";

export const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API_PATH,
  // baseURL: "http://localhost:5000",
  // baseURL: "https://danas-backend.vercel.app/",

  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (data) => {
  try {
    const response = await api.post("user/register", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An unexpected error occurred"
    );
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("auth/login", data);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An unexpected error occurred"
    );
  }
};

// Repeat for other functions as needed

export const signout = async () => {
  let response;

  try {
    response = await api.post("auth/logout");
  } catch (error) {
    return error;
  }
  return response;
};

export const refreshAccessToken = async (refreshToken) => {
  let response;

  try {
    response = await api.post("auth/refresh-token", { refreshToken });
  } catch (error) {
    return error;
  }
  return response.data;
};

export const createBatchRecord = async (data) => {
  let response;

  try {
    response = await api.post("api/record", data);
  } catch (error) {
    return error;
  }
  return response.data;
};

// api.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalReq = error.config;
//     const errorMessage = error.response?.data?.message;

//     if (
//       errorMessage === "Unauthorized" &&
//       (error.response.status === 401 || error.response.status === 500) &&
//       originalReq &&
//       !originalReq._isRetry
//     ) {
//       originalReq._isRetry = true;

//       try {
//         // Use POST method and correct syntax
//         await api.post("/auth/refresh-token");
//         console.log("Token Refreshed Successfully");
//         return api.request(originalReq);
//       } catch (refreshError) {
//         // Redirect to login if refresh fails
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
//     throw error;
//   }
// );

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;
    const errorMessage = error.response && error.response.data && error.response.data.message;

    if (
      errorMessage === 'Unauthorized' &&
            (error.response.status === 401 || error.response.status === 500) &&
            originalReq &&
            !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

       try {
          await axios.get(`${process.env.REACT_APP_INTERNAL_API_PATH}/auth/refresh-token`, {
            withCredentials: true,
          });
  
          return api.request(originalReq);
      }
      catch (error) {
        return error;
      }
    }
    throw error;
  }
);