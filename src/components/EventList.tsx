import React from "react";
import { Event } from "../App";

//Типизируем свойства элемента списка мероприятий
type EventListProps = {
  events: Event[]; //Список мероприятий
  onEdit: (data: Event) => void; //Устанавливает мероприятие в стейт редактируемого
  onDelete: (id: string) => void; //Удаление мероприятия
};

export const EventList: React.FC<EventListProps> = ({
  events,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="events__list">
      {events.map((event) => (
        <li className="events__item" key={event.id}>
          <span>Название: {event.name}</span>
          <span>Дата: {event.date}</span>
          <button onClick={() => onEdit(event)}>Редактировать</button>
          <button onClick={() => onDelete(event.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};
