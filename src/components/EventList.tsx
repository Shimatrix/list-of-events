import React from 'react';
import styles from './EventList.module.css';

interface Event {
  id: string;
  title: string;
  date: string;
}

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <div className={styles.list}>
      <h3>Список мероприятий</h3>
      
      {events.length === 0 ? (
        <p className={styles.emptyList}>Нет мероприятий</p>
      ) : (
        <ul className={styles.events}>
          {events.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <div className={styles.eventContent}>
                <p className={styles.eventTitle}>{event.title}</p>
                <p className={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => onEdit(event)}
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;