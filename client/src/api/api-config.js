import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== "/refresh") {
      originalRequest._retry = true;

      const response = await api.post("/refresh", {}, { withCredentials: true });
      const newToken = response.data.accessToken;

      localStorage.setItem("accessToken", newToken);
      originalRequest.headers["Authorization"] = "Bearer " + newToken;

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);
