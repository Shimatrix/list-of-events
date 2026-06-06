import { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

export interface Event {
  id: number;
  title: string;
  date: string;
}

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const addEvent = (event: Omit<Event, 'id'>) => {
    setEvents(prev => [...prev, { id: Date.now(), ...event }]);
  };

  const updateEvent = (updated: Event) => {
    setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
    setEditingEvent(null);
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="container">
      <h1>Список мероприятий</h1>
      <EventForm addEvent={addEvent} updateEvent={updateEvent} editingEvent={editingEvent} />
      <EventList events={events} onEdit={setEditingEvent} onDelete={deleteEvent} />
    </div>
  );
}