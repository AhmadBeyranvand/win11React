import axios, { AxiosInstance } from "axios";

const axiosInstance:AxiosInstance = axios.create({
    baseURL : 'http://hami-co.ir',
    headers:{
        Authorization : `Bearer `+localStorage.getItem("token")

    }
})

export default axiosInstance