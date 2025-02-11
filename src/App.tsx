import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

interface Event {
  id: number;
  title: string;
  date: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setEditingEvent(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Список мероприятий</h1>
      <EventForm
        onSubmit={editingEvent ? updateEvent : addEvent}
        event={editingEvent}
        setEditingEvent={setEditingEvent}
        events={events}
      />
      <EventList
        events={events}
        onEdit={setEditingEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(<App />);

export default App;
