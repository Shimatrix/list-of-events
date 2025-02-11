import React from "react";

interface EventListProps {
  events: { id: number; title: string; date: string }[];
  onEdit: (event: { id: number; title: string; date: string }) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-item">
          <span>
            {event.title} - {event.date}
          </span>
          <button onClick={() => onEdit(event)}>Редактировать</button>
          <button onClick={() => onDelete(event.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
