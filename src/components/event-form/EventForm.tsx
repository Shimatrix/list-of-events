import styles from "./EventForm.module.css";

import { FormEvent, useEffect, useState } from "react";
import { nanoid } from "nanoid";

export type TEvent = {
    id: string;
    name: string;
    date: string;
};

export type TEventFormProps = {
    curEvent?: TEvent | null;
    clearCurEvent: (data: TEvent | null) => void;
    handlerAddEvent: (data: TEvent) => void;
    handleEditEvent: (data: TEvent) => void;
};
export const EventForm = (props: TEventFormProps) => {
    const { curEvent, clearCurEvent, handleEditEvent, handlerAddEvent } = props;
    const [eventData, setEventData] = useState({
        id: "",
        name: "",
        date: "",
    });

    useEffect(() => {
        if (curEvent) {
            setEventData({
                id: curEvent.id,
                name: curEvent.name,
                date: curEvent.date,
            });
        } else {
            setEventData({
                id: "",
                name: "",
                date: "",
            });
        }
    }, [curEvent]);

    const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (curEvent == null) {
            handlerAddEvent({
                id: nanoid(10),
                name: eventData.name,
                date: eventData.date,
            });
        } else {
            handleEditEvent({
                id: curEvent.id,
                name: eventData.name,
                date: eventData.date,
            });
        }
        setEventData({ id: "", name: "", date: "" });
        clearCurEvent(null);
    };

    return (
        <div>
            <div className={styles.container}>
                <form
                    name="addEvent"
                    onSubmit={handlerSubmit}
                    className={styles.form}
                >
                    <div className={styles.input__field__container}>
                        <label className={styles.input__field}>
                            <span className={styles.input__title}>
                                Название
                            </span>
                            <input
                                name="name"
                                type="text"
                                placeholder="Введите название"
                                value={eventData.name}
                                onChange={(event) => {
                                    setEventData({
                                        ...eventData,
                                        name: event.target.value,
                                    });
                                }}
                                className={styles.input}
                                required
                            />
                        </label>
                        <label className={styles.input__field}>
                            <span className={styles.input__title}>
                                Дата проведения
                            </span>
                            <input
                                name="date"
                                type="date"
                                placeholder="Дата"
                                value={eventData.date}
                                onChange={(event) => {
                                    setEventData({
                                        ...eventData,
                                        date: event.target.value,
                                    });
                                }}
                                className={styles.input}
                                required
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        title="Сохранить"
                        className={styles.button_save}
                    >
                        {curEvent == null ? "Создать" : "Редактировать"}
                    </button>
                </form>
            </div>
        </div>
    );
};
