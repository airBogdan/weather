import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL
const STATIONS_BASE_URL = process.env.REACT_APP_STATIONS_BASE_URL
const KEY = process.env.REACT_APP_WEATHER_KEY

export const axiosInstance = axios.create({
    baseURL: BASE_URL
})

export const axiosInsanceStations = axios.create({
    baseURL: STATIONS_BASE_URL
})

axiosInstance.interceptors.request.use((config) => {
    config.url = config.url+ '&APPID=' + KEY;
    return config;
})

export const apiCall = async (
    url,
    method = 'GET',
    data = {}
) => {
    try {
        const res = await axiosInstance({
            method,
            url: `${url}`,
            timeout: 500000,
            data: method == 'POST' ? data : null,
        })
        return res.data
    }
    catch (err) {
        throw new Error(err.response)
    }
}

export const stationsApiCall = async (
    url,
    method = 'GET',
    data = {}
) => {
    const dataMethods = ['POST', 'DELETE']
    const useData = dataMethods.indexOf(method) > -1
    try {
        const res = await axiosInsanceStations({
            method,
            url: `${url}`,
            timeout: 500000,
            data: useData ? data : null,
        })
        return res.data
    }
    catch (err) {
        throw new Error(err.response)
    }
}