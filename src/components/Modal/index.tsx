import React, { Dispatch } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { desck, setDealerCards, setFromModal, setOpenModal } from '../../features/blackjack/blackjackSlice';
import ModalStyle from './Modal.module.css';
import { TypeCard } from '../../types/card';
import { Firework } from '../Firework';

interface ModalWinProps {
    open: boolean,
    setTransfer: Dispatch<boolean>,
    setDoubleBet: Dispatch<boolean>,
}

export const ModalWin: React.FC<ModalWinProps> = React.memo(({ open, setTransfer, setDoubleBet }): JSX.Element => {
    const dispatch = useAppDispatch()
    const { textModal, dealerCards } = useAppSelector(state => state.blackJackData)

    const onCloseModal = () => {
        repeat()
    }

    //մեթոդ որը հնարաորություն է տալիս ապահովվել դիլլոռի խաղաքարտերի թարմացմանը և խաղի շարունակությանը
    const repeat = () => {
        if (dealerCards.length < 18 && open) {
            alert('xarnel')
            let helpArr: TypeCard[] = []
            const stirCards = () => {
                let tempCard = Math.round(Math.random() * 51)
                if (helpArr.length === 52) {
                    return dispatch(setDealerCards(helpArr))
                } else {
                    if (!helpArr.find(el => el.id === tempCard)) {
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
        }
        dispatch(setFromModal(true))
        setTransfer(false)
        setDoubleBet(false)
        dispatch(setOpenModal(''))
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={onCloseModal}
                center
                animationDuration={800}
            >
                {(textModal === 'You Won' || textModal === 'BlackJack') ? <>
                    <Firework />
                    <div className={ModalStyle.modal}>
                        <h2>{textModal}</h2>
                        <div className={ModalStyle.btns}>
                            <button
                                className={ModalStyle.btnContinue}
                                onClick={repeat}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </> : <>
                    <div className={ModalStyle.modal}>
                        <audio autoPlay src={require('../../audio/error.mp3')}>
                        </audio>
                        <h2>{textModal}</h2>
                        <div className={ModalStyle.btns}>
                            <button
                                className={ModalStyle.btnContinue}
                                onClick={repeat}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </>}
            </Modal>
        </div>
    )
})