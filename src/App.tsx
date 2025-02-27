import React from "react";
import { useState } from "react";
import { EventForm } from "./components/EventForm";
import { EventList } from "./components/EventList";
import { nanoid } from "nanoid";

//Типизипуем данные мероприятия
export type Event = {
  id: string;
  name: string;
  date: string;
};

//Данные для инициализаци списка мероприятий
const initialStateEvents: Event[] = [
  {
    id: nanoid(8), //генерируем id мероприятия
    name: "Конференция по разработке",
    date: "14.03.2025",
  },
  {
    id: nanoid(8),
    name: "Воркшоп по TypeScript",
    date: "21.03.2025",
  },
  {
    id: nanoid(8),
    name: "Митап по DevOps",
    date: "10.04.2025",
  },
];

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialStateEvents); //Основной стейт со списком мероприятий
  const [editEventState, setEditEventState] = useState<Event | null>(null); //Стейт для работы с данными редактируемого мероприятия

  //Добавить мероприятие
  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };

  //Удалить мероприятие
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  //Изменить данные мероприятия
  const changeEvent = (data: Event) => {
    setEvents(events.map((event) => (event.id === data.id ? data : event)));
  };

  return (
    <section className="events-container">
      <h1>Список мероприятий</h1>
      <EventForm
        editEventState={editEventState}
        onAdd={addEvent}
        onChange={changeEvent}
        setEditEventState={setEditEventState}
      />
      <EventList
        events={events}
        onEdit={setEditEventState}
        onDelete={deleteEvent}
      />
    </section>
  );
};

export default App;
