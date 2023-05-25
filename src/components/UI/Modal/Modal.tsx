import React, { FC } from 'react'
import { IoMdClose } from 'react-icons/io'

interface IProps {
  children: React.ReactNode
}

export const Modal: FC<IProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="overlay"></div>

      <div className="modal__content">
        <div className="modal__close">
          <IoMdClose />
        </div>

        {children}
      </div>
    </div>
  )
}
