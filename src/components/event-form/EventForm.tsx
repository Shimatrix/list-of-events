import styles from "./EventForm.module.css";

import { FormEvent, useState } from "react";
import { nanoid } from "nanoid";

export type TEvent = {
    id: string;
    name: string;
    date: string;
};

export type TEventFormProps = {
    curEvent?: TEvent | null;
    handlerAddEvent: (data: TEvent) => void;
    handleEditEvent: (data: TEvent) => void;
};
export const EventForm = (props: TEventFormProps) => {
    const { curEvent, handleEditEvent, handlerAddEvent } = props;

    const [eventData, setEventData] = useState<TEvent>(
        curEvent ? curEvent : { id: "", name: "", date: "" }
    );

    const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (curEvent == null) {
            setEventData({ ...eventData, id: nanoid(10) });
            handlerAddEvent(eventData);
            console.log("in add");
        } else {
            handleEditEvent(eventData);
            console.log("in edit");
        }
    };

    return (
        <div>
            <h2 className={styles.title}></h2>
            <div className={styles.container}>
                <form name="addEvent" onSubmit={handlerSubmit}>
                    <label className={styles.input__field}>
                        <span className={styles.input__title}>Название</span>
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
                        Дата проведения
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
