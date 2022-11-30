import { Routes, Route } from 'react-router-dom';
import Weather from "./views/Weather";
import Stations from "./views/Stations";

export const Paths = {
    WEATHER_PATH: '/',
    STATIONS_PATH: '/stations'
}

export default function AppRoutes () {
    return (
        <Routes>
            <Route path={Paths.WEATHER_PATH} element={<Weather />} />
            <Route path={Paths.STATIONS_PATH} element={<Stations />} />
        </Routes>
    )
}