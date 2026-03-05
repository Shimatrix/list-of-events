import React, { useEffect, useState } from "react";
import EventForm, { EventData } from "./components/EventForm";
import EventList from "./components/EventList";
import styles from "./App.module.css";

export type EventWithId = EventData & {
  id: number;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<EventWithId[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventWithId | null>(null);

  // загрузка данных из localStorage
  useEffect(() => {
    const data = localStorage.getItem("events");

    if (data) {
      const parsed = JSON.parse(data);
      setEvents(parsed);
    }
  }, []);

  // сохранение данных
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddOrUpdate = (event: EventData) => {
    // редактирование
    if (event.id) {
      const updatedEvents = events.map((item) => {
        if (item.id === event.id) {
          return {
            ...item,
            title: event.title,
            date: event.date,
          };
        }
        return item;
      });

      setEvents(updatedEvents);
      setEditingEvent(null);
      return;
    }

    // добавление
    const newEvent: EventWithId = {
      id: Date.now(),
      title: event.title,
      date: event.date,
    };

    setEvents([...events, newEvent]);
  };

  const handleEditClick = (event: EventWithId) => {
    setEditingEvent(event);
  };

  const handleDelete = (id: number) => {
    const filtered = events.filter((event) => event.id !== id);
    setEvents(filtered);

    if (editingEvent && editingEvent.id === id) {
      setEditingEvent(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Список мероприятий</h1>

      <div className={styles.content}>
        <EventForm
          initialEvent={editingEvent}
          onSubmit={handleAddOrUpdate}
          onCancelEdit={handleCancelEdit}
        />

        <EventList
          events={events}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;