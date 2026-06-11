import { useState , useEffect } from "react";

import type { Event } from "../App";

type EventFormProps = {
  onAdd: (title: string, date: string) => void;
  onUpdate: (title: string, date: string) => void;
  editEvent: Event | null;
};

function EventForm( { onAdd, onUpdate, editEvent }: EventFormProps ) {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

    useEffect(() => {
    if (editEvent) {
        setTitle(editEvent.title);
        setDate(editEvent.date);
    }
    }, [editEvent]);

  

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!title.trim() || !date) {
      alert("Заполните все поля!");
      return;
    }

    if (editEvent) {
    onUpdate(title, date);
    } else {
    onAdd(title, date);
    }

    setTitle("");
    setDate("");
  };
    
  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Событие" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      <button type="submit"> {editEvent ? "Сохранить" : "Добавить"} </button>
    </form>
  );
}
export default EventForm;