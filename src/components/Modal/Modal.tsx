import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

interface ModalProps {
    children: React.ReactNode;
}

const modalRoot = document.getElementById("react-modals");

export const Modal = (props: ModalProps): ReactElement => {
    const { children} = props;

    return ReactDOM.createPortal(
        (
            <div className={styles.modal__overlay}>
                <div className="modal">
                    {children}
                </div>
            </div>
        ),
        modalRoot!
    );
}