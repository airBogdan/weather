import './App.scss';
import Navbar from "./components/Navbar";
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/store";
import Layout from "./Layout";

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Navbar />
                <Layout />
            </Provider>
        </Router>
    );
}

export default App;