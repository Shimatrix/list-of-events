import { TEvent } from "../event-form/EventForm";
import styles from "./EventList.module.css";

export type TEventListProps = {
    events: TEvent[];
    handlerEditEvent: (data: TEvent) => void;
    handlerRemoveEvent: (id: string) => void;
};

export const EventList = (props: TEventListProps) => {
    const { events, handlerEditEvent, handlerRemoveEvent } = props;

    return events?.length > 0 ? (
        <ul className={styles.list__container}>
            {events?.map((item) => (
                <li className={styles.list__item} key={item.id}>
                    <div className={styles.list__item__info}>
                        <span className={styles.list__item__name}>
                            {item.name}
                        </span>
                        <span>{item.date}</span>
                    </div>
                    <div className={styles.button__container}>
                        <button
                            className={`${styles.button} ${styles.button_edit}`}
                            onClick={() => {
                                console.log(item);
                                handlerEditEvent(item);
                            }}
                        ></button>
                        <button
                            className={`${styles.button} ${styles.button_remove}`}
                            onClick={() => handlerRemoveEvent(item.id)}
                        ></button>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <div className={styles.list__container}>
            <div className={styles.list__item}>
                <span className={styles.list_empty}>
                    Нет запланированных мероприятий
                </span>
            </div>
        </div>
    );
};
