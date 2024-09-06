import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { History } from "../pages/History";

export function Router() {
    
    // Render
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/history" element={ <History /> } />
            </Routes>
        </BrowserRouter>
    )

}