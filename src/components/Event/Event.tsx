import { ReactElement } from "react";
import { IEvent } from "../../utils/types.ts";
import  styles from './Event.module.css'

type TEventProps = {
    event: IEvent;
    handleEdit: (event: IEvent) => void;
    handleDelete: (id:string) => void;
};

export const Event = (props: TEventProps): ReactElement => {
    return (
        <div className={styles.event__card}>
            <p>{props.event.date.toDateString()}</p>
            <h3>{props.event.title}</h3>
            <div className={styles.event__card_btns}>
                <button className={styles.event__card_btn} onClick={() => props.handleEdit(props.event)}>Редактировать</button>
                <button className={styles.event__card_btn} onClick={() => props.handleDelete(props.event.id)}>Удалить</button>
            </div>
        </div>
    )
}