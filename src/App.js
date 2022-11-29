import './App.scss';
import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes";

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <AppRoutes />
            </main>
        </Router>
    );
}

export default App;