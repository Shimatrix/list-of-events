import { useState } from "react";
import EventForm from "./components/EventForm";
import EventsList from "./components/EventsList";

export type Event = {
  id: number;
  title: string;
  date: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);

    const addEvent = (title: string, date: string) => {
    const newEvent: Event = {
      id: Date.now(),
      title,
      date,
    };

    setEvents([...events, newEvent]);
  };

    const startEdit = (event: Event) => {
    setEditId(event.id);
    setEditEvent(event);
    };
    
    const updateEvent = (title: string, date: string) => {
    setEvents(
    events.map((event) =>
      event.id === editId
        ? { ...event, title, date }
        : event
    )
  );

  setEditId(null);
  setEditEvent(null);
};
    
    const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
    };

  return (
    <div className="container">
      <h1>Список мероприятий</h1>

      <EventForm  onAdd={addEvent}  onUpdate={updateEvent} editEvent={editEvent}/>

      <EventsList events={events} onDelete={deleteEvent} onEdit={startEdit} />
    </div>
  );
}

export default App;