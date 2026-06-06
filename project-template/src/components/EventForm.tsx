import { useEffect, useState } from 'react';
import { Event } from '../App';

type Props = {
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (event: Event) => void;
  editingEvent: Event | null;
};

export default function EventForm({ addEvent, updateEvent, editingEvent }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
    }
  }, [editingEvent]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return setError('Введите название мероприятия');
    if (!date) return setError('Выберите дату');

    setError('');

    if (editingEvent) {
      updateEvent({ id: editingEvent.id, title, date });
    } else {
      addEvent({ title, date });
    }

    setTitle('');
    setDate('');
  };

  return (
    <form className="event-form" onSubmit={submit}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Название мероприятия" />
      <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
      {error && <p className="error">{error}</p>}
      <button type="submit">{editingEvent ? 'Редактировать' : 'Добавить'}</button>
    </form>
  );
}