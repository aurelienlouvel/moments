import {Route, Routes} from "react-router-dom"

import Home from "../pages/Home"
import Moments from "../pages/Moments"
import Moment from "../pages/Moment"

function Root() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/moments" element={<Moments/>}/>
            <Route path="/moment:id" element={<Moment/>}/>
        </Routes>
    )
}

export default Root