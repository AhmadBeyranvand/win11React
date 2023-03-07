import axios, { AxiosHeaders } from "axios";

const axiosInstance = axios.create({
    baseURL : 'http://hami-co.ir',
    headers:{
        Authorization : `Bearer `+localStorage.getItem("token")

    }
})

export default axiosInstance