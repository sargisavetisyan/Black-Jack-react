import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlackJack } from "../../pages/BlackJack";
import { Home } from "../../pages/Home";
import { Layout } from "../Layout";

export const GameRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="blackjack" element={<BlackJack />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}