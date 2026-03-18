import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PagueHome from "./components/PageHome.tsx";
import PageAuth from "./components/PageAuth.tsx";
import {useAuth} from "./store/useAuth.ts";

function App() {
    return (
        <BrowserRouter>
            <RoutesWrapper />
        </BrowserRouter>
    );
}

function RoutesWrapper() {
    const navigate = useNavigate();
    const { isLogin } = useAuth();

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        } else {
            navigate('/auth');
        }
    }, [isLogin, navigate]);

    return (
        <Routes>
            <Route path="/" element={<PagueHome />} />
            <Route path="/auth" element={<PageAuth />} />
        </Routes>
    );
}

export default App;

