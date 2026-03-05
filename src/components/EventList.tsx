import React from "react";
import { EventData } from "./EventForm";
import styles from "./EventList.module.css";

type EventItem = EventData & {
  id: number;
};

type EventListProps = {
  events: EventItem[];
  onEdit: (event: EventItem) => void;
  onDelete: (id: number) => void;
};

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {

  // функция для форматирования даты
  const formatDate = (date: string) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}.${month}.${year}`;
  };

  if (events.length === 0) {
    return <p className={styles.empty}>Мероприятий пока нет</p>;
  }

  return (
    <div className={styles.list}>
      {events.map((event) => {
        const formattedDate = formatDate(event.date);

        return (
          <div key={event.id} className={styles.eventItem}>
            <div>
              <div>{event.title}</div>
              <div>{formattedDate}</div>
            </div>

            <div className={styles.eventActions}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onEdit(event)}
              >
                Редактировать
              </button>

              <button
                type="button"
                className="btn-danger"
                onClick={() => onDelete(event.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;