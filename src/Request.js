import axios from 'axios';

// Set the base URL for your API
const Baseurl = "https://schoolmanagementsystem-p1od.onrender.com/api/";
// const Baseurl = "http://localhost:3500/api/"

const request = axios.create({
  baseURL: Baseurl,
  withCredentials: true  // Enable sending cookies with cross-origin requests
});
request.interceptors.request.use(
  (config)=>{
      const token = localStorage.getItem("token") || sessionStorage.getItem("token")
      if(token){
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config
  },
  (error)=>{
      return Promise.reject(error)
  }
)


export default request;

