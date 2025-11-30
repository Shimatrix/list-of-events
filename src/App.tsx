import React, { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

interface Event {
  id: string;
  title: string;
  date: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      setEvents(prev =>
        prev.map(e => (e.id === editingEvent.id ? { ...e, ...eventData } : e))
      );
      setEditingEvent(null);
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventData,
      };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const handleEdit = (event: Event) => setEditingEvent(event);
  const handleCancelEdit = () => setEditingEvent(null);
  const handleDelete = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}> 
      <h1>Менеджер мероприятий</h1>
      <EventForm
        onSubmit={handleAddEvent}
        onCancel={handleCancelEdit}
        initialData={editingEvent}
      />
      <EventList
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;