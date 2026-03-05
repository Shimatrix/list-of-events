import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./EventForm.module.css";

export type EventData = {
  id?: number;
  title: string;
  date: string;
};

type EventFormProps = {
  initialEvent?: EventData | null;
  onSubmit: (event: EventData) => void;
  onCancelEdit?: () => void;
};

const EventForm: React.FC<EventFormProps> = ({ initialEvent, onSubmit, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<{ title?: string; date?: string }>({});

  // редактируем событие — заполняем форму
  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDate(initialEvent.date);

      const d = new Date(initialEvent.date);
      setCalendarDate(d);
    } else {
      setTitle("");
      setDate("");
      setCalendarDate(null);
    }
  }, [initialEvent]);

  // форматируем дату для отображения
  const formatDate = (value: string) => {
    const d = new Date(value);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleCalendarChange = (value: any) => {
    const selectedDate = Array.isArray(value) ? value[0] : value;

    setCalendarDate(selectedDate);

    if (selectedDate) {
      setDate(selectedDate.toISOString());
    }
  };

  const validate = () => {
    const newErrors: { title?: string; date?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Введите название";
    }

    if (!date) {
      newErrors.date = "Выберите дату";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }

    const eventData: EventData = {
      id: initialEvent?.id,
      title: title.trim(),
      date: date,
    };

    onSubmit(eventData);

    // очищаем форму если это новое событие
    if (!initialEvent) {
      setTitle("");
      setDate("");
      setCalendarDate(null);
    }
  };

  const isEditing = Boolean(initialEvent);

  const formattedDate = date ? formatDate(date) : "";

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.fieldLabel}>
        Название
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </label>

      {errors.title && <div className={styles.error}>{errors.title}</div>}

      <div className={styles.dateSection}>
        <div>Дата</div>

        <Calendar
          value={calendarDate}
          onChange={handleCalendarChange}
        />
      </div>

      {date && (
        <div className={styles.selectedDate}>
          Выбранная дата: {formattedDate}
        </div>
      )}

      {errors.date && <div className={styles.error}>{errors.date}</div>}

      <div className={styles.buttons}>
        <button type="submit" className="btn-primary">
          {isEditing ? "Сохранить" : "Добавить"}
        </button>

        {isEditing && onCancelEdit && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancelEdit}
          >
            Отменить
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;