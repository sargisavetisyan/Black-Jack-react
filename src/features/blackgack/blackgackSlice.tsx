import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeCard } from "../../types/card";
import { TypeUser } from "../../types/user";

export const chips: TypeCard[] = [
    { id: 0, coordinates: { x: -28, y: -14 }, unit: 1 },
    { id: 1, coordinates: { x: -159, y: -14 }, unit: 5 },
    { id: 2, coordinates: { x: -290, y: -14 }, unit: 25 },
    { id: 3, coordinates: { x: -426, y: -17 }, unit: 50 },
    { id: 4, coordinates: { x: -98, y: -141 }, unit: 100 },
    { id: 5, coordinates: { x: -237, y: -142 }, unit: 500 },
    { id: 6, coordinates: { x: -375, y: -142 }, unit: 1000 }
]

export const desck: TypeCard[] = [
    // clubs ♣
    { id: 0, coordinates: { x: -137, y: -25 }, unit: 2 },
    { id: 1, coordinates: { x: -249, y: -25 }, unit: 3 },
    { id: 2, coordinates: { x: -362, y: -25 }, unit: 4 },
    { id: 3, coordinates: { x: -474, y: -25 }, unit: 5 },
    { id: 4, coordinates: { x: -586, y: -25 }, unit: 6 },
    { id: 5, coordinates: { x: -698, y: -25 }, unit: 7 },
    { id: 6, coordinates: { x: -810, y: -25 }, unit: 8 },
    { id: 7, coordinates: { x: -923, y: -25 }, unit: 9 },
    { id: 8, coordinates: { x: -1035, y: -25 }, unit: 10 },
    { id: 9, coordinates: { x: -1148, y: -25 }, unit: 10 },
    { id: 10, coordinates: { x: -1260, y: -25 }, unit: 10 },
    { id: 11, coordinates: { x: -1371, y: -25 }, unit: 10 },
    { id: 12, coordinates: { x: -1483, y: -25 }, unit: 11 },
    // spades ♠
    { id: 13, coordinates: { x: -137, y: -187 }, unit: 2 },
    { id: 14, coordinates: { x: -249, y: -187 }, unit: 3 },
    { id: 15, coordinates: { x: -362, y: -187 }, unit: 4 },
    { id: 16, coordinates: { x: -474, y: -187 }, unit: 5 },
    { id: 17, coordinates: { x: -586, y: -187 }, unit: 6 },
    { id: 18, coordinates: { x: -698, y: -187 }, unit: 7 },
    { id: 19, coordinates: { x: -810, y: -187 }, unit: 8 },
    { id: 20, coordinates: { x: -923, y: -187 }, unit: 9 },
    { id: 21, coordinates: { x: -1035, y: -187 }, unit: 10 },
    { id: 22, coordinates: { x: -1148, y: -187 }, unit: 10 },
    { id: 23, coordinates: { x: -1260, y: -187 }, unit: 10 },
    { id: 24, coordinates: { x: -1371, y: -187 }, unit: 10 },
    { id: 25, coordinates: { x: -1483, y: -187 }, unit: 11 },
    // hearts ♥
    { id: 26, coordinates: { x: -137, y: -349 }, unit: 2 },
    { id: 27, coordinates: { x: -249, y: -349 }, unit: 3 },
    { id: 28, coordinates: { x: -362, y: -349 }, unit: 4 },
    { id: 29, coordinates: { x: -474, y: -349 }, unit: 5 },
    { id: 30, coordinates: { x: -586, y: -349 }, unit: 6 },
    { id: 31, coordinates: { x: -698, y: -349 }, unit: 7 },
    { id: 32, coordinates: { x: -810, y: -349 }, unit: 8 },
    { id: 33, coordinates: { x: -923, y: -349 }, unit: 9 },
    { id: 34, coordinates: { x: -1035, y: -349 }, unit: 10 },
    { id: 35, coordinates: { x: -1148, y: -349 }, unit: 10 },
    { id: 36, coordinates: { x: -1260, y: -349 }, unit: 10 },
    { id: 37, coordinates: { x: -1371, y: -349 }, unit: 10 },
    { id: 38, coordinates: { x: -1483, y: -349 }, unit: 11 },
    // diams ♦
    { id: 39, coordinates: { x: -137, y: -509 }, unit: 2 },
    { id: 40, coordinates: { x: -249, y: -509 }, unit: 3 },
    { id: 41, coordinates: { x: -362, y: -509 }, unit: 4 },
    { id: 42, coordinates: { x: -474, y: -509 }, unit: 5 },
    { id: 43, coordinates: { x: -586, y: -509 }, unit: 6 },
    { id: 44, coordinates: { x: -698, y: -509 }, unit: 7 },
    { id: 45, coordinates: { x: -810, y: -509 }, unit: 8 },
    { id: 46, coordinates: { x: -923, y: -509 }, unit: 9 },
    { id: 47, coordinates: { x: -1035, y: -509 }, unit: 10 },
    { id: 48, coordinates: { x: -1148, y: -509 }, unit: 10 },
    { id: 49, coordinates: { x: -1260, y: -509 }, unit: 10 },
    { id: 50, coordinates: { x: -1371, y: -509 }, unit: 10 },
    { id: 51, coordinates: { x: -1483, y: -509 }, unit: 11 }
]

// գործիք որի միջոցով խառնվում է կարթերի տռցակը
export const startStirCards = () => {
    let helpArr: TypeCard[] = []
    const stirCards = () => {
        let tempCard = Math.round(Math.random() * 51)
        if (helpArr.length === 52) {
            return helpArr
        } else {
            if (!(helpArr.find(el => el.id === tempCard))) {
                desck.find(el => {
                    if (el.id === tempCard) {
                        helpArr.push(el)
                    }
                })
            }
            stirCards()
        }
    }
    stirCards()
    return helpArr
}

export const gameRule = {
    immediatelyStart(sumPlayer: number, sumCpu: number, funDispatch: any, fun: any) {
        if (sumPlayer === 21 && sumCpu === 21) {
            let text = 'Draw'
            funDispatch(fun(text))
        } else if (sumPlayer === 21 && sumCpu !== 21) {
            let text = 'BlackGack'
            funDispatch(fun(text))
        } else {  //petq e poxvi
            if (sumCpu === 21 && sumPlayer !== 21) {
                let text = 'You Lost'
                funDispatch(fun(text))
            }
        }
    },
    playerRule(sumPlayer: number, funDispatch: any, fun: any) {
        if (sumPlayer > 21) {
            let text = 'You Lost'
            funDispatch(fun(text))
        }
    },
    CpuRule(sumPlayer: number, sumCpu: number, funDispatch: any, funOpen: any, fun: any) {
        if (sumCpu === 21 && sumPlayer < 21) {
            let text = 'You Lost'
            funDispatch(funOpen(text))
        }
        else if (sumCpu === 21 && sumPlayer === 21) {
            let text = 'Draw'
            funDispatch(funOpen(text))
        }
        else if (sumCpu > 21) {
            let text = 'You Won'
            funDispatch(funOpen(text))
        }
        else if (sumCpu < 21 && sumCpu > sumPlayer) {
            let text = 'You Lost'
            funDispatch(funOpen(text))
        }
        else {
            if (sumCpu < 17 && sumCpu <= sumPlayer) {
                funDispatch(fun(1))
            } else if (sumCpu < 17 && sumCpu > sumPlayer) {
                let text = 'You Lost'
                funDispatch(funOpen(text))
            } else {
                if (sumCpu < 21 && sumCpu >= 17) {
                    if (sumCpu > sumPlayer) {
                        let text = 'You Lost'
                        funDispatch(funOpen(text))
                    } else if (sumCpu === sumPlayer) {
                        let text = 'Draw'
                        funDispatch(funOpen(text))
                    } else {
                        funDispatch(fun(1))
                    }
                }
            }
        }
    }
}

export interface BlackGackInterface {
    user: TypeUser,
    bet: TypeCard[],
    totalBet: number,
    fishka: TypeCard,
    dealerCards: TypeCard[],
    playerCards: TypeCard[],
    CpuCards: TypeCard[],
    sumPlayer: number,
    sumCpu: number,
    openModal: boolean,
    fromModal: boolean,
    textModal: string,
}

const initialState: BlackGackInterface = {
    user: {
        id: 0,
        name: 'Saqo',
        surname: 'Avetisyan',
        age: 36,
        blackgackUnit: 1000
    },
    bet: [],
    totalBet: 0,
    fishka: {} as TypeCard,
    dealerCards: [],
    playerCards: [],
    CpuCards: [],
    sumPlayer: 0,
    sumCpu: 0,
    openModal: false,
    fromModal: true,
    textModal: '',
}

export const blackGackSlice = createSlice({
    name: 'play',
    initialState,
    reducers: {
        setDealerCards(state, action: PayloadAction<TypeCard[]>) {
            state.dealerCards = [...action.payload]
        },
        setPlayerCards(state, action: PayloadAction<number>) {
            for (let i = 0; i < action.payload; i++) {
                if (action.payload <= 1) {
                    state.playerCards.push(state.dealerCards[i])
                    state.dealerCards.shift()
                } else {
                    state.playerCards.push(state.dealerCards[i])
                    if (state.playerCards.length === 2) {
                        state.dealerCards.shift()
                        state.dealerCards.shift()
                    }
                }
            }
        },
        setCpuCards(state, action: PayloadAction<number>) {
            for (let i = 0; i < action.payload; i++) {
                if (action.payload <= 1) {
                    state.CpuCards.push(state.dealerCards[i])
                    state.dealerCards.shift()
                } else {
                    state.CpuCards.push(state.dealerCards[i])
                    if (state.CpuCards.length === 2) {
                        state.dealerCards.shift()
                        state.dealerCards.shift()
                    }
                }
            }
        },
        setNullPlayerCards(state) {
            state.playerCards = []
        },
        setNullCpuCards(state) {
            state.CpuCards = []
        },
        setSumPlayer(state, action: PayloadAction<number>) {
            state.sumPlayer = action.payload
        },
        setSumCpu(state, action: PayloadAction<number>) {
            state.sumCpu = action.payload
        },
        setOpenModal(state, action: PayloadAction<string>) {
            state.openModal = !state.openModal
            state.textModal = action.payload
        },
        setFromModal(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.fromModal = false
            } else {
                state.fromModal = true
            }
        },
        setUser(state, action: PayloadAction<number>) {
            state.user = { ...state.user, blackgackUnit: state.user.blackgackUnit - action.payload }
        },
        addUserBlackGackUnit(state, action: PayloadAction<number>) {
            state.user = { ...state.user, blackgackUnit: state.user.blackgackUnit + action.payload }
        },
        setBet(state, action: PayloadAction<TypeCard>) {
            state.bet.push(action.payload)
        },
        deleteBet(state) {
            state.bet = []
        },
        setTotalBet(state, action: PayloadAction<number>) {
            state.totalBet += action.payload
        },
        setDouble(state) {
            state.totalBet *= 2
        },
        deleteTotalBet(state) {
            state.totalBet = 0
        },
        setFiska(state, action: PayloadAction<TypeCard>) {
            state.fishka = action.payload
        },
    },
})

export default blackGackSlice.reducer

export const {
    setDealerCards,
    setPlayerCards,
    setCpuCards,
    setNullPlayerCards,
    setNullCpuCards,
    setSumPlayer,
    setSumCpu,
    setOpenModal,
    setFromModal,
    setUser,
    setBet,
    setTotalBet,
    setDouble,
    addUserBlackGackUnit,
    deleteTotalBet,
    deleteBet,
    setFiska,
} = blackGackSlice.actions