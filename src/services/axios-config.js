import axios from "axios"

const baseURL = 'https://lab.pixel6.co'

const instance = axios.create({
    baseURL,
    // withCredentials: true
})

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export {instance}
