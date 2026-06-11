
import type { Event } from "../App";

type EventsListProps = {
  events: Event[];
  onDelete: (id: number) => void;
  onEdit: (event: Event) => void;
};

function EventsList({ events, onDelete, onEdit  }: EventsListProps) {
  return (
    <ul>
      {events.map((event) => (
        <li className="event-item" key={event.id}>
          <span className="event-text">
          {event.title} - {event.date}
          </span>
          <div className="event-buttons">
          <button onClick={() => onEdit(event)}>Редактировать</button>
          <button onClick={() => onDelete(event.id)}>Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EventsList;