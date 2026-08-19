type EventItem = {
  id: number;
  title: string;
  date: string;
};

type EventListProps = {
  events: EventItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

/** Только отображение списка. Изменения массива делает App через onEdit / onDelete. */
export default function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return <p>Пока нет мероприятий</p>;
  }

  return (
    <ul>
      {events.map((event) => (
        // key по id, а не по индексу: React тогда не путает строки после удаления.
        <li key={event.id}>
          {event.title} — {event.date}{' '}
          <button type="button" onClick={() => onEdit(event.id)}>
            Редактировать
          </button>
          <button type="button" onClick={() => onDelete(event.id)}>
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
}
