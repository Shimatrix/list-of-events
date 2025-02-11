import React, { useState, useEffect } from "react";

interface EventFormProps {
  onSubmit: (event: { id: number; title: string; date: string }) => void;
  event?: { id: number; title: string; date: string } | null;
  setEditingEvent: (
    event: { id: number; title: string; date: string } | null,
  ) => void;
  events: { id: number; title: string; date: string }[];
}

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  event,
  setEditingEvent,
  events,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
    } else {
      setTitle("");
      setDate("");
    }
  }, [event]);

  const formatDate = (inputDate: string) => {
    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let validationError = "";
    const today = new Date().toISOString().split("T")[0];

    if (!title.trim()) {
      validationError = "⚠️ Введите название мероприятия.";
    } else if (title.trim().length < 3) {
      validationError = "⚠️ Название должно содержать минимум 3 символа.";
    } else if (title.trim().length > 50) {
      validationError = "⚠️ Название не должно превышать 50 символов.";
    } else if (!date.trim()) {
      validationError = "📅 Укажите дату мероприятия.";
    } else if (date < today) {
      validationError = "📅 Дата не может быть в прошлом.";
    } else if (
      events.some(
        (e) =>
          e.title.toLowerCase() === title.toLowerCase() && e.id !== event?.id,
      )
    ) {
      validationError = "⚠️ Мероприятие с таким названием уже существует.";
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit({ id: event?.id || Date.now(), title, date: formatDate(date) });
    setTitle("");
    setDate("");
    setEditingEvent(null);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form" noValidate>
      <input
        type="text"
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit">{event ? "Сохранить" : "Добавить"}</button>
    </form>
  );
};

export default EventForm;
