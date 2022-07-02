import React from "react";
import {Routes, Route} from 'react-router-dom'

import Search from "./Search";
import Home from "./Home";
import Report from "./Report";

const Content = props => {
    return (
        <>
            <br/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<Search />} />
                <Route path="/report" element={<Report />} />
            </Routes>
        </>
    )
}

export default Content;