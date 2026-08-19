import { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

/** Одно мероприятие: название и дата из задания, id — чтобы менять и удалять нужную строку. */
type EventItem = {
  id: number;
  title: string;
  date: string;
};

function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  /** id строки, которую сейчас правят; null — режим добавления. */
  const [editingId, setEditingId] = useState<number | null>(null);

  const editingEvent = events.find((event) => event.id === editingId) ?? null;

  /** Новое мероприятие в конец списка. id берём из текущего времени — так он уникален без сервера. */
  function handleAdd(title: string, date: string) {
    setEvents([...events, { id: Date.now(), title, date }]);
  }

  /**
   * Обновляет поля у элемента с этим id.
   * map нужен, чтобы строка осталась на том же месте, а не уехала в конец.
   */
  function handleUpdate(id: number, title: string, date: string) {
    setEvents(events.map((event) => (
      event.id === id ? { ...event, title, date } : event
    )));
    setEditingId(null);
  }

  /** Убирает мероприятие из массива. Если его как раз редактировали — сбрасываем режим правки. */
  function handleDelete(id: number) {
    setEvents(events.filter((event) => event.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  }

  return (
    <div>
      <h1>Список мероприятий</h1>
      <EventForm
        editingEvent={editingEvent}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
      />
      <EventList
        events={events}
        onEdit={setEditingId}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
