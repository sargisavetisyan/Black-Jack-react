import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GiSoundOn, GiSoundOff, GiExitDoor } from "react-icons/gi";
import { Computer } from "../../components/Computer";
import { ModalWin } from "../../components/Modal";
import { Player } from "../../components/Player";
import { addUserBlackJackUnit, chips, deleteBet, deleteTotalBet, gameRule, setBet, setCpuCards, setDealerCards, setDouble, setFiska, setFromModal, setNullCpuCards, setNullPlayerCards, setOpenModal, setPlayerCards, setTotalBet, setUser, startStirCards, } from "../../features/blackjack/blackjackSlice";
import { TypeCard } from "../../types/card";
import BlackJackStyle from './BlackJack.module.css';
import { Conditions } from "../../components/Conditions";

export const BlackJack: React.FC = React.memo((): JSX.Element => {
    const dispatch = useAppDispatch()
    const { sumPlayer, sumCpu, playerCards, CpuCards, openModal, fromModal, user, bet, totalBet, fishka, textModal } = useAppSelector(state => state.blackJackData)

    const volumn = useRef<HTMLAudioElement>({} as HTMLAudioElement)

    useEffect(() => {
        volumn.current.volume = 0.2
    }, [])

    // 1. ** Սեխմակ որի օգտագործմամբ մոտենում ենք սեխանին օգտվելով  startGame մեթոդից ** \\
    const [start, setStart] = useState<boolean>(true)
    // **  **  **  **  **  **  **  **  **  **  **  **  ** \\

    // 2. ** Բուլեան դաշտ որի օգտագործմամբ անջատում ենք խաղի ձայնը ** \\
    const [sound, setSound] = useState<boolean>(true)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  ** **  **  \\

    // 3. ** Սեխմակ որի օգտագործմամբ նստում ենք սեխանի շուրջ ** \\
    const [sitDownBtn, setSitDownBtn] = useState<boolean>(true)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  ** \\

    // 4. ** Բուլեան դաշտ որի օգտագործմամբ ավտոմատացնում ենք Cpu-ի խաղը ** \\
    const [transfer, setTransfer] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **   **  **   ** \\

    // 5. ** Բուլեան դաշտ որի օգտագործմամբ կրկնապատկում ենք խաղադրույքը ** \\
    const [doubleBet, setDoubleBet] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **   **  **   ** \\

    // 6. ** Բուլեան դաշտեր  որոնք ակտիվացնում են մնացած սեղմակները ** \\
    const [activeChip, setActiveChip] = useState<boolean>(true)
    const [activeCancel, setActiveCancel] = useState<boolean>(false)
    const [activeGive, setActiveGive] = useState<boolean>(false)
    const [activeHit, setActiveHit] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  ** \\

    // 7. ** Բուլեան դաշտ որը ակտիվացնում է ֆիշկայի անիմացիան ** \\
    const [loading, setLoading] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  ** \\

    // 8. ** Տես 1-ում: Խաղաքրտերը խառնվում են ** \\
    const startGame = () => {
        let res: TypeCard[] = startStirCards()
        dispatch(setDealerCards(res))
        setStart(false)
    }
    // **  **  **  **  ** \\

    // 9. ** Տես 2-ում: անջատում ենք խաղի ձայնը ** \\
    const soundOnOff = () => {
        setSound(!sound)
    }
    // **  **  **  **  ** **  **  **  **  **  **  \\

    // 10. ** Դուրս ենք գալիս խաղից ** \\
    const exit = () => {
        setStart(true)
        setSound(true)
        setSitDownBtn(true)
        setTransfer(false)
        setDoubleBet(false)
        setActiveChip(true)
        setActiveCancel(false)
        setActiveGive(false)
        setActiveHit(false)
        setLoading(false)
        setTime(7)
        setTimer(false)
        dispatch(setNullPlayerCards())
        dispatch(setNullCpuCards())
        dispatch(deleteBet())
        dispatch(deleteTotalBet())
        // aystex petq e amen inch zroyana baci xaxacoxi poxeric
    }

    useEffect(() => {

    }, [start])
    // **  **  **  **  ** **  **  ** \\

    // 11. ** Տես 3-ում ** \\
    const sitDown = () => {
        //ete useri poxer@ = en 0 chi kara nsti
        setSitDownBtn(!sitDownBtn)
    }
    // **  **  **  **  **  \\
    const [time, setTime] = useState<number>(7)
    const [timer, setTimer] = useState<boolean>(false)

    // 12. ** Մեթոդ որի օգնությամբ կատարվում է սկզբնական խաղադրույքը, որտեղ աշխատում են 6 և 7 կետերը ** \\
    const isBet = (elChip: TypeCard) => {
        if (activeChip) {
            setTimer(true)
            setLoading(true)
            dispatch(setFiska(elChip))
            setTimeout(() => {
                setLoading(false)
            }, 300)
            chips.map(chip => {
                if (chip.id === elChip.id) {
                    dispatch(setUser(chip.unit))
                    // Գրվել է   setTimeout-ի մեջ որպեսզի ֆիշկեն տեղ հասնի նոր երևա քցած ֆիշկեն
                    setTimeout(() => {
                        dispatch(setBet(chip))
                    }, 300)
                    dispatch(setTotalBet(chip.unit))
                }
            })
            setActiveGive(true)
            setActiveCancel(true)
        }
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 13. ** Մեթոդ որի օգնությամբ չեղարկվում է սկզբնական խաղադրույքը, աշխատում է 6 կետը ** \\
    const cancel = () => {
        dispatch(addUserBlackJackUnit(totalBet))
        dispatch(deleteBet())
        dispatch(deleteTotalBet())
        setActiveCancel(false)
        setActiveGive(false)
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 14. ** Բուլեան դաշտեր  որոնք ակտիվացնում են խաղաքառտերի անիմացիան ** \\
    const [loadingCardPlayer, setLoadingCardPlayer] = useState<boolean>(false)
    const [loadingTwoCard, setloadingTwoCard] = useState<boolean>(true)
    const [loadingCard, setloadingCard] = useState<boolean>(false)
    const [loadingDealer, setLoadingDealer] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 15. ** Մեթոդ որի օգնությամբ ստանում ենք խաղաքարտեր ** \\
    const givCard = () => {
        setTimer(false)
        dispatch(setFromModal(false))
        setLoadingCardPlayer(true)
        setLoadingDealer(true)
        setloadingTwoCard(true)
        setTimeout(() => {
            dispatch(setPlayerCards(2))
            setloadingTwoCard(false)
        }, 600)
        setTimeout(() => {
            dispatch(setCpuCards(2))
            setLoadingDealer(false)
        }, 1400)
        setActiveGive(false)
        setActiveCancel(false)
        setActiveChip(false)
        setActiveHit(true)
        if (user.blackjackUnit >= totalBet) {
            setDoubleBet(true)
        }
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  ** \\
    useEffect(() => {
        if (time === 0 && totalBet > 0) {
            setActiveChip(false)
            setActiveCancel(false)
            setTimer(false)
        }
    }, [time, totalBet])
    // 16. ** Մեթոդ որի օգնությամբ խաղացողը ստանում է 1 խաղաքարտ ** \\
    const hit = () => {
        setloadingCard(true)
        setDoubleBet(false)
        setTimeout(() => {
            dispatch(setPlayerCards(1))
            setloadingCard(false)
        }, 300)
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 17. ** Մեթոդ որի օգնությամբ ավարտվում է խաղացողի քայլը ** \\
    const stand = () => {
        setTransfer(!transfer)
        setDoubleBet(false)
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 18. ** Բուլեան դաշտեր  որի օգնությամբ պարզում ենք double-ի սեղմված լինելը ** \\
    const [auto, setAuto] = useState<boolean>(false)
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 19. ** Մեթոդ որի օգնությամբ կրկնապատկում ենք խաղադրույքը ** \\
    const double = () => {
        setAuto(true)
        dispatch(setDouble())
        dispatch(setUser(totalBet))
        hit()
        setDoubleBet(false)
    }
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\

    // 20. ** խաղադրույքը կրկնապատկելու ժմկ ապահովվում է Cpu-ի ավտոմատ գործողությունը ** \\
    useEffect(() => {
        if (playerCards.length === 3 && sumPlayer <= 21 && auto === true) {
            setAuto(false)
            setTimeout(() => {
                stand()
                setActiveChip(false)
            }, 300)
        }
    }, [sumPlayer, auto, playerCards.length])  // playerCards.length,  avelacrel em
    // **  **  **  **  **  **  **  **  **  **  **  **  **  **  **  \\


    useEffect(() => {

    }, [user, loading, activeGive, activeCancel, loadingTwoCard, loadingCardPlayer, loadingCard, loadingDealer])

    // բիտայի անիմացիան է տեղի ունենում  դատարկվում են խաղացողի և Cpu-ի քարտերի զանգվածները
    useEffect(() => {
        if (fromModal === false) {
            setTimeout(() => {
                dispatch(setNullCpuCards())
                dispatch(setNullPlayerCards())
                // աըստեղ պետք ե զրոյացվի ամեն ինչ 
            }, 310)
        }
    }, [fromModal, dispatch])//dispatch

    // խաղի սկզբնամասում ստուգվում է BlackGack-ի առկայությունը
    useEffect(() => {
        if (playerCards.length === 2 && CpuCards.length === 2) {
            setTimeout(() => {
                gameRule.immediatelyStart(sumPlayer, sumCpu, dispatch, setOpenModal)
            }, 400)
        }
    }, [sumCpu, sumPlayer, CpuCards.length, dispatch, playerCards.length])//CpuCards.length,dispatch,playerCards.length

    //Խաղի ավարտի դեպքում սեղմակները բերվում է սկզբնական վիճակի
    useEffect(() => {
        if (textModal === 'Draw') {
            setloadingCard(false)
            setActiveChip(true)
            setActiveHit(false)
            dispatch(addUserBlackJackUnit(totalBet))
            dispatch(deleteTotalBet())
            dispatch(deleteBet())
        }
        if (textModal === 'You Won' || textModal === 'BlackJack') {
            setloadingCard(false)
            setActiveChip(true)
            setActiveHit(false)
            dispatch(addUserBlackJackUnit(totalBet * 2))
            dispatch(deleteTotalBet())
            dispatch(deleteBet())
        }
        if (textModal === 'You Lost') {
            setloadingCard(false)
            setActiveChip(true)
            setActiveHit(false)
            dispatch(deleteTotalBet())
            dispatch(deleteBet())
        }
    }, [textModal, activeChip, activeGive, dispatch, totalBet])//dispatch,totalBet

    return (
        <>
            {sound && <audio ref={volumn} autoPlay loop={true} src={require('../../audio/kazino.mp3')} >
            </audio>}
            {start ?
                <div className={BlackJackStyle.blackjack}>
                    <img src={require('../../images/blackJack.jpg')} alt='' />
                    <button
                        className={BlackJackStyle.play}
                        onClick={startGame}
                    >
                        Play
                    </button>
                    <audio autoPlay src={require('../../audio/door.mp3')}>
                    </audio>
                </div> :
                <>
                    <audio autoPlay src={require('../../audio/door.mp3')}>
                    </audio>
                    <div
                        style={{ height: 'calc(100vh - 63px)' }}  //63-@ navbari -i barcrutyunn e
                        className={BlackJackStyle.room}
                    >
                        <div className={BlackJackStyle.exit}>
                            <Conditions
                                time={time}
                                setTime={setTime}
                                active={timer}
                            />
                            <button
                                className={BlackJackStyle.sound}
                                onClick={soundOnOff}
                            >
                                {sound ? <GiSoundOn /> : <GiSoundOff />}
                            </button>
                            <button
                                className={BlackJackStyle.exitDoor}
                                onClick={exit}
                            >
                                <GiExitDoor />
                            </button>
                        </div>
                        <div className={BlackJackStyle.content}>
                            <div className={BlackJackStyle.dealer}>
                                <Computer
                                    transfer={transfer}
                                    loadingDealer={loadingDealer}
                                    setLoadingDealer={setLoadingDealer}
                                />
                                {loadingDealer &&
                                    <div className={loadingTwoCard ? `${BlackJackStyle.twoCard}` : `${BlackJackStyle.twoCardCpu}`}>
                                        <img
                                            className={BlackJackStyle.imgDealer}
                                            src={require('../../images/card.jpg')}
                                            alt=''
                                        />
                                        {loadingTwoCard ? <audio autoPlay loop={true} src={require('../../audio/oun.mp3')}>
                                        </audio> :
                                            <audio autoPlay loop={true} src={require('../../audio/oun.mp3')}>
                                            </audio>}
                                    </div>
                                }
                                {loadingCard && <>
                                    <audio autoPlay loop={true} src={require('../../audio/oun.mp3')}>
                                    </audio>
                                    <div
                                        className={loadingCard ? `${BlackJackStyle.card}` : `${BlackJackStyle.cardCpu}`}>
                                        <img
                                            className={BlackJackStyle.imgDealer}
                                            src={require('../../images/card.jpg')}
                                            alt=''
                                        />
                                    </div></>
                                }
                            </div>
                            <div
                                style={sitDownBtn ? { justifyContent: 'none' } : { justifyContent: 'space-between' }}
                                className={BlackJackStyle.player}
                            >
                                <div className={BlackJackStyle.chip1}>
                                    {sitDownBtn ? <button
                                        className={BlackJackStyle.sitDown}
                                        onClick={sitDown}
                                    >
                                        Sit down
                                    </button> :
                                        <div className={BlackJackStyle.bet}>
                                            <audio autoPlay src={require('../../audio/fhishki.mp3')}>
                                            </audio>
                                            {bet.map((chip: TypeCard, i: number) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        style={{ transform: `rotateX(60deg) translateZ(${i + 2 * i + 2}px)` }}
                                                        className={BlackJackStyle.chipBet}
                                                    >
                                                        <img
                                                            className={BlackJackStyle.imgBet}
                                                            style={{ objectPosition: `${chip.coordinates.x}px ${chip.coordinates.y}px`, }}
                                                            src={require('../../images/chip.jpg')}
                                                            alt=''
                                                        />
                                                        <audio autoPlay src={require('../../audio/fishka.mp3')}>
                                                        </audio>
                                                    </div>
                                                )
                                            })}
                                            {loading &&
                                                <div className={BlackJackStyle.chipLoading}>
                                                    <img
                                                        style={{ objectPosition: `${fishka.coordinates.x}px ${fishka.coordinates.y}px`, }}
                                                        className={BlackJackStyle.img}
                                                        src={require('../../images/chip.jpg')}
                                                        alt=''
                                                    />
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div >
                                    {loadingCardPlayer &&
                                        <Player
                                            loading={loadingCardPlayer}
                                        />
                                    }
                                </div>
                            </div>
                            {
                                !sitDownBtn &&
                                <div className={BlackJackStyle.sectionCommands}>
                                    <div className={BlackJackStyle.chips}>
                                        {activeCancel && <button
                                            className={BlackJackStyle.cancel}
                                            onClick={cancel}
                                        >
                                            Cancel
                                        </button>
                                        }
                                        {chips.map((chip: TypeCard, i: number) => {
                                            if (chip.unit <= user.blackjackUnit) {
                                                return (
                                                    <div
                                                        key={i}
                                                        className={BlackJackStyle.chip}
                                                        onClick={isBet.bind(null, chip)}
                                                    >
                                                        <img
                                                            className={BlackJackStyle.img}
                                                            style={{ objectPosition: `${chip.coordinates.x}px ${chip.coordinates.y}px`, }}
                                                            src={require('../../images/chip.jpg')}
                                                            alt=''
                                                        />
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className={BlackJackStyle.balance}>
                                        Balance <span>{user.blackjackUnit} $</span>
                                    </div>
                                    <div className={BlackJackStyle.totalBet}>
                                        Bet <span>{totalBet} $</span>
                                    </div>
                                    <div
                                        className={BlackJackStyle.commands}>
                                        <button
                                            style={activeGive ? { backgroundColor: '#277701' } : { backgroundColor: '#616161' }}
                                            className={BlackJackStyle.btnHit}
                                            disabled={activeGive ? false : true}
                                            onClick={givCard}
                                        >
                                            Give
                                        </button>
                                        <button
                                            style={activeHit ? { backgroundColor: '#0be215' } : { backgroundColor: '#616161' }}
                                            className={BlackJackStyle.btnHit}
                                            disabled={!activeHit ? true : false}
                                            onClick={hit}
                                        >
                                            Hit
                                        </button>
                                        <button
                                            style={activeHit ? { backgroundColor: '#e41616' } : { backgroundColor: '#616161' }}
                                            className={BlackJackStyle.btnStand}
                                            disabled={!activeHit ? true : false}
                                            onClick={stand}
                                        >
                                            Stand
                                        </button>
                                        <button
                                            style={doubleBet ? { backgroundColor: '#0fdbe2' } : { backgroundColor: '#616161' }}
                                            className={BlackJackStyle.btnDouble}
                                            disabled={!doubleBet ? true : false}
                                            onClick={double}
                                        >
                                            Double
                                        </button>
                                        {/* <button
                                            className={BlackJackStyle.btnDouble}
                                            disabled={active ? true : false}
                                            onClick={disabled}
                                        >
                                            Split
                                        </button> */}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        openModal &&
                        <ModalWin
                            open={openModal}
                            setTransfer={setTransfer}
                            setDoubleBet={setDoubleBet}
                        />
                    }
                </>
            }
        </>
    )
})