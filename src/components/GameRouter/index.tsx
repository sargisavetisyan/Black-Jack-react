import { BrowserRouter, Route, Routes } from "react-router-dom"
import { BlackGack } from "../../pages/BlackGack"
import { Home } from "../../pages/Home"
import { Layout } from "../Layout"

export const GameRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="blackgack" element={<BlackGack />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}