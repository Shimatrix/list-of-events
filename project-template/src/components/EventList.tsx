import { Event } from '../App';

type Props = {
  events: Event[];
  onDelete: (id:number)=>void;
  onEdit: (event: Event)=>void;
};

export default function EventList({events,onDelete,onEdit}:Props){
  if(!events.length){
    return <div className="empty">Пока нет мероприятий</div>;
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <div>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
          </div>
          <div className="actions">
            <button className="edit-btn" onClick={()=>onEdit(event)}>Редактировать</button>
            <button className="delete-btn" onClick={()=>onDelete(event.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  )
}