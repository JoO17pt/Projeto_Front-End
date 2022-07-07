import React from "react";
import {Routes, Route} from 'react-router-dom'
import "../components/content.css"

import Search from "./Search";
import Home from "./Home";
import Report from "./Report";

const Content = props => {
    return (
        <main>
            <br/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<Search />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </main>
    )
}

export default Content;