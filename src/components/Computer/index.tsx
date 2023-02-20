import React, { Dispatch, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { gameRule, setCpuCards, setOpenModal, setSumCpu } from "../../features/blackgack/blackgackSlice";
import { TypeCard } from "../../types/card";
import CpuStyle from './Cpu.module.css';

interface CpuProps {
    transfer: boolean,
    loadingDealer: boolean,
    setLoadingDealer: Dispatch<boolean>
}

export const Computer: React.FC<CpuProps> = React.memo(({ transfer, loadingDealer, setLoadingDealer }): JSX.Element => {
    const dispatch = useAppDispatch()
    const { CpuCards, sumCpu, sumPlayer, fromModal, textModal } = useAppSelector(state => state.blackGackData)

    const [closeCard, setCloseCard] = useState<boolean>(false)
    const [rotate, setRotate] = useState<boolean>(false)

    //Հաշվարկվում է Cpu-ի խաղաքարտերի գումարը
    const sumCard = () => {
        let res = 0
        CpuCards.map(el => {
            if (res > 10 && el.unit === 11) {
                return res += 1
            } else {
                return res += el.unit
            }
        })
        dispatch(setSumCpu(res))
    }

    useEffect(() => {
        if (transfer === true) {
            if (CpuCards.length > 2) {
                setLoadingDealer(true)
                setTimeout(() => {
                    setLoadingDealer(false)
                }, 300)
            }
            setTimeout(() => {
                gameRule.CpuRule(sumPlayer, sumCpu, dispatch, setOpenModal, setCpuCards)
            }, 600)
        }
    }, [sumCpu, transfer])

    useEffect(() => {
        // if (textModal !== 'You Lost') {
        sumCard()
        // }
    }, [transfer, CpuCards])

    // *********
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
                <>
                    {!rotate ?
                        <div className={CpuStyle.cards}>
                            {CpuCards.map((card: TypeCard, i: number) => {
                                return (
                                    <div
                                        className={CpuStyle.cardBita}
                                        key={i}
                                    >
                                        <img
                                            className={CpuStyle.img}
                                            style={{ objectPosition: `${CpuCards[0].coordinates.x}px ${CpuCards[0].coordinates.y}px`, }}
                                            src={require('../../images/card.jpg')}
                                            alt=''
                                        />
                                    </div>
                                )
                            })}
                        </div> :
                        <>
                            <div className={CpuStyle.cards}>
                                {CpuCards.map((card: TypeCard, i: number) => {
                                    return (
                                        <div
                                            className={CpuStyle.cardBita}
                                            key={i}
                                        >
                                            <img
                                                className={CpuStyle.img}
                                                src={require('../../images/card.jpg')}
                                                alt=''
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                </> :
                <>
                    {CpuCards.length === 2 ?
                        <>
                            {transfer === false && textModal === '' ?  //textModal@ apahovum e qari bacvelun
                                <>
                                    <div className={CpuStyle.sum}>{sumCpu - CpuCards[1].unit}</div>
                                    <div className={CpuStyle.cards}>
                                        <div
                                            className={CpuStyle.card}
                                        >
                                            <img
                                                className={CpuStyle.img}
                                                style={{ objectPosition: `${CpuCards[0].coordinates.x}px ${CpuCards[0].coordinates.y}px`, }}
                                                src={require('../../images/card.jpg')}
                                                alt=''
                                            />
                                        </div>
                                        <div className={CpuStyle.card}>
                                            <img
                                                className={CpuStyle.img}
                                                src={require('../../images/card.jpg')}
                                                alt=''
                                            />
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <>
                                        <div className={CpuStyle.sum}>{sumCpu}</div>
                                        <div className={CpuStyle.cards}>
                                            {CpuCards.map((card: TypeCard, i: number) => {
                                                return (
                                                    <div
                                                        className={CpuStyle.card}
                                                        key={i}
                                                    >
                                                        <img
                                                            className={CpuStyle.img}
                                                            style={{ objectPosition: `${card.coordinates.x}px ${card.coordinates.y}px`, }}
                                                            src={require('../../images/card.jpg')}
                                                            alt=''
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                </>
                            }
                        </> :
                        <>
                            {loadingDealer ?  //animacian e 
                                <div className={CpuStyle.Cpu}>
                                    {sumCpu !== 0 && <div className={CpuStyle.sum}>{sumCpu}</div>}
                                    <div className={CpuStyle.cards}>
                                        {CpuCards.map((card: TypeCard, i: number) => {
                                            if (i < CpuCards.length - 1) {
                                                return (
                                                    <div
                                                        className={CpuStyle.card}
                                                        key={i}
                                                    >
                                                        <img
                                                            className={CpuStyle.img}
                                                            style={{ objectPosition: `${card.coordinates.x}px ${card.coordinates.y}px`, }}
                                                            src={require('../../images/card.jpg')}
                                                            alt=''
                                                        />
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div> :
                                <>
                                    {sumCpu !== 0 && loadingDealer === false && <div className={CpuStyle.sum}>{sumCpu}</div>}
                                    <div className={CpuStyle.cards}>
                                        {CpuCards.map((card: TypeCard, i: number) => {
                                            return (
                                                <div
                                                    className={CpuStyle.card}
                                                    key={i}
                                                >
                                                    <img
                                                        className={CpuStyle.img}
                                                        style={{ objectPosition: `${card.coordinates.x}px ${card.coordinates.y}px`, }}
                                                        src={require('../../images/card.jpg')}
                                                        alt=''
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    )
})