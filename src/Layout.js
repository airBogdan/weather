import React from "react";
import AppRoutes from "./routes";
import { Spinner } from "./assets/Spinner";
import { useSelector } from 'react-redux';

export default function Layout () {
    const loading = useSelector((state) => state.loading.value)
    return (
        <main>
            {loading && <Spinner/>}
            <AppRoutes />
        </main>
    )
}