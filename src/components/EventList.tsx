import React from "react";
import { EventItem } from "../App";

interface EventsListProps {
    events: EventItem[];
    onEdit: (event: EventItem) => void;
    onDelete: (id: number | undefined) => void;
}

const formatDate = (d: string): string => {
  const date = new Date(d);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const EventsList: React.FC<EventsListProps> = ({ events, onEdit, onDelete }) => {
    return (
        <ul>
            {events.length === 0 ? (
                <p className="emptyListText">Мероприятия отсутсвуют</p>
            ) : (
            events.map((event) => (
                <li key={event.id}>
                    <p className="eventText">ID:{event.id} - Название: '{event.title}' Дата: {formatDate(event.date)}</p>
                    <button className="listEditButton" onClick={() => onEdit(event)}>Редактировать</button>
                    <button className="lsitDeleteButton" onClick={() => onDelete(event.id)}>Удалить</button>
                </li>
            ))
            )}
        </ul>
    );
};

export default EventsList;