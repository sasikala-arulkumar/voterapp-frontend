import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api/voters", // match backend
  baseURL:"https://voterapp-backend-uqqb.onrender.com",
});

export default axiosInstance;
