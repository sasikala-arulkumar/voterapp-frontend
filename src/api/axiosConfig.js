import axios from "axios";


const axiosInstance = axios.create({
  baseURL:"https://sasikalaarul-voterapp.onrender.com/api/voters", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
