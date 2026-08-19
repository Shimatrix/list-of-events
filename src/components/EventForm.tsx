import { useEffect, useState } from 'react';

type EventItem = {
  id: number;
  title: string;
  date: string;
};

type EventFormProps = {
  editingEvent: EventItem | null;
  onAdd: (title: string, date: string) => void;
  onUpdate: (id: number, title: string, date: string) => void;
};

/** Форма добавления и редактирования. Сам список не хранит — только поля ввода и вызывает колбэки App. */
export default function EventForm({ editingEvent, onAdd, onUpdate }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // Если в списке нажали «Редактировать», подставляем выбранную строку в поля.
  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
      setError('');
    }
  }, [editingEvent]);

  /** Пустое название или нет даты — не даём сохранить. */
  function isValid() {
    if (!title.trim() || !date) {
      setError('Заполните название и дату');
      return false;
    }
    setError('');
    return true;
  }

  function handleAdd() {
    if (!isValid()) return;
    onAdd(title.trim(), date);
    setTitle('');
    setDate('');
  }

  function handleEdit() {
    if (!editingEvent) {
      setError('Сначала выберите мероприятие в списке');
      return;
    }
    if (!isValid()) return;
    onUpdate(editingEvent.id, title.trim(), date);
    setTitle('');
    setDate('');
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>
          Название
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Дата
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={handleAdd}>Добавить</button>
      <button type="button" onClick={handleEdit}>Редактировать</button>
    </form>
  );
}
