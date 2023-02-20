import React from "react";
import { Link } from "react-router-dom";
import HomeStyle from './Home.module.css';

export const Home: React.FC = React.memo(() => {
    return (
        <div className={HomeStyle.games}>
            <Link to={'blackgack'}>
                <div className={HomeStyle.game}></div>
            </Link>
        </div>
    )
})