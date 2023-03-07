import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'http://hami-co.ir',
    headers:{
        common: {
            Authorization :  `Bearer `+localStorage.getItem("token")
        }
    }
})

export default axiosInstance