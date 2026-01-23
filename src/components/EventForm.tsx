import React, { useState, useEffect } from 'react';
import { EventItem } from '../App';

interface EventProps {
    editEvent: EventItem | null;
    onSubmit: (event: EventItem ) => void;
}

const EventForm: React.FC<EventProps> = ({ editEvent, onSubmit }) => {
    const [title, setTitle] = useState(editEvent?.title || '');
    const [date, setDate] = useState(editEvent?.date || '');

    useEffect(() => {
        if (editEvent) {
            setTitle(editEvent.title);
            setDate(editEvent.date);
        } else {
            setTitle('');
            setDate('');
        };
    }, [editEvent]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({ title, date });

        if (!editEvent) {
            setTitle('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Название мероприятия' value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type='date' value={date} onChange={(e) => setDate(e.target.value)} required />
            <div>
                {!editEvent ? (
                    <button type='submit' className='formAddButton'>Добавить</button>
                ) : (
                    <button type='submit' className='formEditButton'>Сохранить изменения</button>
                )}
            </div>
        </form>
    );
};

export default EventForm;