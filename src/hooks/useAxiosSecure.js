import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_Server_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Add request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 401) {
          logoutUser();
          navigate("/login")
        }
        if ( status === 403) {
          console.warn("🚫 Unauthorized or Forbidden, redirecting...");
          navigate("/forbidden");
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when user/logs out or changes
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
