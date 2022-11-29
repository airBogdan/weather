import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const KEY = process.env.REACT_APP_WEATHER_KEY

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.url = config.url+ '&APPID=' + KEY;
    return config;
})

export const apiCall = async (
    url,
    method = 'GET',
    // data = {}
) => {
    var data = {
        "external_id": "SF_TEST001",
        "name": "San Francisco Test Station",
        "latitude": "37.76",
        "longitude": "-122.43",
        "altitude": "150"
    };
    try {
        const res = await axiosInstance({
            method,
            // url: `${BASE_URL}${url}`,
            url: `${url}`,
            timeout: 500000,
            data: method == 'POST' ? data : null,
        })
        return res.data
    }
    catch (err) {
        console.log('err', err)
        throw new Error(err.response)
    }
}