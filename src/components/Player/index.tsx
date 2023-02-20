import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { gameRule, setOpenModal, setSumPlayer } from "../../features/blackjack/blackjackSlice";
import { TypeCard } from "../../types/card";
import PlayerStyle from './Player.module.css';

interface PlayerProps {
    loading: boolean
}

export const Player: React.FC<PlayerProps> = React.memo((loading): JSX.Element => {
    const dispatch = useAppDispatch();
    const { playerCards, sumPlayer, fromModal } = useAppSelector(state => state.blackJackData)

    const [closeCard, setCloseCard] = useState<boolean>(false)
    const [rotate, setRotate] = useState<boolean>(false)

    //Հաշվարկվում է խաղացողի խաղաքարտերի գումարը
    const sumCard = () => {
        let res = 0
        playerCards.map(el => {
            if (res > 10 && el.unit === 11) {
                return res += 1
            } else {
                return res += el.unit
            }
        })
        dispatch(setSumPlayer(res))
    }

    useEffect(() => {
        setTimeout(() => {
            gameRule.playerRule(sumPlayer, dispatch, setOpenModal)
        }, 400)
    }, [sumPlayer])

    useEffect(() => {
        sumCard()
    }, [playerCards])
    // *******************************

    // բիտայի անիմացիան է տեղի ունենում  
    useEffect(() => {
        if (fromModal === false) {
            setCloseCard(true)
            setRotate(true)
            setTimeout(() => {
                setRotate(false)
            }, 60)
        }
        else {
            setCloseCard(false)
            setRotate(false)
        }
    }, [fromModal, closeCard])

    return (
        <>
            {closeCard ?
                <div className={PlayerStyle.cards}>
                    <audio autoPlay src={require('../../audio/razdacha.mp3')}>
                    </audio>
                    {playerCards.map((el: TypeCard, i: number) => {
                        return (
                            <div
                                className={PlayerStyle.cardBita}
                                key={i}
                            >
                                <img
                                    className={PlayerStyle.img}
                                    src={require('../../images/card.jpg')}
                                    alt=''
                                />
                            </div>
                        )
                    })}
                </div> :
                <>
                    {sumPlayer !== 0 && <div className={PlayerStyle.sum}>{sumPlayer}</div>}
                    {loading && <div className={PlayerStyle.cards}>
                        {playerCards.map((el: TypeCard, i: number) => {
                            return (
                                <div
                                    className={PlayerStyle.card}
                                    key={i}
                                >
                                    <img
                                        className={PlayerStyle.img}
                                        style={{ objectPosition: `${el.coordinates.x}px ${el.coordinates.y}px`, }}
                                        src={require('../../images/card.jpg')}
                                        alt=''
                                    />
                                </div>
                            )
                        })}
                    </div>}
                </>
            }
        </>
    )
})