import React, { Dispatch, useEffect } from "react";
import ConditionsStyle from './Conditions.module.css';

interface ConditionsProps {
    time: number,
    setTime: Dispatch<number>
    active: boolean
}

export const Conditions: React.FC<ConditionsProps> = React.memo(({ time, setTime, active }) => {

    useEffect(() => {
        if (active === true) {
            setTimeout(() => {
                setTime(time - 1)
                if (time <= 0) {
                    setTime(7)
                }

            }, 1000)
        } else {
            setTime(7)
        }
    }, [time, active])
    return (
        <div className={ConditionsStyle.conditions}>
            <h4>Min Bet <span>1</span> $</h4>
            {active &&
                <div className={ConditionsStyle.timer}>{time}</div>
            }
        </div>
    )
})