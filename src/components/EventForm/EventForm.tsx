import {useState} from "react";
import {IEvent} from "../../utils/types.ts";
import styles from './EventForm.module.css'
import {nanoid} from "nanoid";

// Компонент EventForm
interface EventFormProps {
    event?: IEvent | undefined;
    onSubmit: (event: IEvent) => void;
}

export const EventForm = (props: EventFormProps): React.ReactElement => {
    const [title, setTitle] = useState(props.event?.title || '');
    const [date, setDate] = useState(props.event?.date || '');
    const [errors, setErrors] = useState<{ title?: string, date?: string }>({});

    // Функция валидации формы
    const validateForm = (): boolean => {
        const newErrors: { title?: string, date?: string } = {};

        if (!title.trim()) {
            newErrors.title = 'Название мероприятия не может быть пустым.';
        }
        if (!date) {
            newErrors.date = 'Дата мероприятия обязательна.';
        } else {
            const selectedDate = new Date(date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (selectedDate < currentDate) {
                newErrors.date = 'Дата мероприятия не может быть в прошлом.';
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Функция отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) { // Проверяем форму перед отправкой
            const newEvent: IEvent = {
                id: nanoid(),
                title,
                date: new Date(date),
            };
            props.onSubmit(newEvent);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={ styles.event__form } noValidate={true} >
            <label className={styles.event__form_label}>
                <span>Название мероприятия</span>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Важное мероприятие" required/>
            </label>
            {errors.title && <p className={styles.event__form_error}>{errors.title}</p>}
            <label className={styles.event__form_label}>
                <span>Дата мероприятия</span>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                {errors.date && <p className={styles.event__form_error}>{errors.date}</p>}
            </label>
            <div>
                <button type="submit">
                    {props.event ? 'Редактировать' : 'Добавить'}
                </button>
            </div>
        </form>
    );
};