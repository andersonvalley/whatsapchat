import React, { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

interface IProps {
  children: React.ReactNode
  openModal: boolean
  setOpenModal: (type: boolean) => void
}

export const Modal: FC<IProps> = ({ openModal, setOpenModal, children }) => {
  return (
    <div className={openModal ? 'modal active' : 'modal'}>
      <div onClick={() => setOpenModal(false)} className={openModal ? 'overlay active' : 'overaly'}></div>

      <div className="modal__content">
        <div onClick={() => setOpenModal(false)} className="modal__close">
          <IoMdClose />
        </div>

        {children}
      </div>
    </div>
  )
}
