import React, { useState, useEffect } from 'react';
import styles from './EventForm.module.css'; 

interface Event {
  id: string;
  title: string;
  date: string;
}

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'>) => void;
  onCancel?: () => void;
  initialData?: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [date, setDate] = useState(initialData?.date ? initialData.date.slice(0, 10) : '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDate(initialData.date.slice(0, 10));
    } else {
      setTitle('');
      setDate('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    onSubmit({
      title: title.trim(),
      date: new Date(date).toISOString(),
    });

    if (!initialData) {
      setTitle('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>{initialData ? 'Редактировать мероприятие' : 'Добавить мероприятие'}</h3>
      
      <div className={styles.field}>
        <label className={styles.label}>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </label>
      </div>
      
      <div className={styles.field}>
        <label className={styles.label}>
          Дата:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
            required
          />
        </label>
      </div>
      
      <div className={styles.buttons}>
        <button type="submit" className={styles.button}>
          {initialData ? 'Сохранить' : 'Добавить'}
        </button>
        {initialData && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;