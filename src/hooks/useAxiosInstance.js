import axios from "axios";
const axiosinstance = axios.create({
  baseURL: `https://work-sync-server-pi.vercel.app`,
});
const useAxiosInstance = () => {
  return axiosinstance;
};

export default useAxiosInstance;