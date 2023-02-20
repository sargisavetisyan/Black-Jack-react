import React from "react";
import FireworkStyle from './Firework.module.css';

export const Firework: React.FC = React.memo(() => {
    return (
        <>
            <audio autoPlay src={require('../../audio/tadam.mp3')}>
            </audio>
            <div className={FireworkStyle.firework}></div>
            <div className={FireworkStyle.firework}></div>
            <div className={FireworkStyle.firework}></div>
        </>
    )
})