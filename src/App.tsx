import React, { useState } from "react";
import EventForm from './components/EventForm'
import EventsList from './components/EventList';
import './styles.css';

export interface EventItem {
    id?: number;
    title: string;
    date: string;
}

const App: React.FC = () => {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [editEvent, setEditEvent] = useState<EventItem | null>(null);

    const handleAddEvent = (event: EventItem) => {
        if (!editEvent) {
            const newEvent: EventItem = {
                id: Date.now(), //Math.floor(Math.random() * 10),
                ...event, 
            };
            setEvents([...events, newEvent]);
        } else {
            setEvents(events.map(e => (e.id === editEvent.id ? { ...e, ...event} : e)));
            setEditEvent(null);
        };
    };

    const handleEdit = (event:EventItem) => {
        setEditEvent(event);
    };

    const handleDeleteEvent = (id: number | undefined) => {
        setEvents(events.filter(e => e.id !== id));
    };

    return (
        <div className="container">
            <h1>Мероприятия:</h1>
            <EventForm onSubmit={handleAddEvent} editEvent={editEvent}></EventForm>
            <EventsList events={events} onEdit={handleEdit} onDelete={handleDeleteEvent}></EventsList>
        </div>
    );
};

export default App;