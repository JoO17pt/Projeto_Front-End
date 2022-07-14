import React from "react";
import {Routes, Route} from 'react-router-dom'
import "../components/styles/content.css"

import Search from "./views/Search";
import Home from "./views/Home";
import Report from "./views/Report";

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