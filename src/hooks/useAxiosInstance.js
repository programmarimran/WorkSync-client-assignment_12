import axios from "axios";
const axiosinstance = axios.create({
  baseURL: import.meta.env.VITE_Server_URL,
});
const useAxiosInstance = () => {
  return axiosinstance;
};

export default useAxiosInstance;