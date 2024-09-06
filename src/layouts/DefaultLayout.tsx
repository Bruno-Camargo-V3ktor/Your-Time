import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
    
    // Render
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )

}