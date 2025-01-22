import './App.css'
import { EventList } from "./components/EventList/EventList.tsx";
import { useState } from "react";
import { EventForm } from "./components/EventForm/EventForm.tsx";
import { IEvent } from "./utils/types.ts";
import {nanoid} from "nanoid";
import { Modal } from './components/Modal/Modal.tsx'

function App() {
  const [eventsState, setEventsState] = useState([
    {
      id: nanoid(),
      title: 'Мероприятие 1',
      date: new Date(2015, 1, 1)
    },
    {
      id: nanoid(),
      title: 'Мероприятие 2',
      date: new Date(2025, 1, 9)
    },
    {
      id: nanoid(),
      title: 'Мероприятие 3',
      date: new Date(2025, 1, 21)
    },
  ])
  const [editingEvent, setEditingEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Функция добавления нового мероприятия
  const handleAdd = () => {
    setEditingEvent(null);
    setIsFormVisible(true);
  }

  // Функция редактирования мероприятия
  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
    setIsFormVisible(true);
  }

  // Функция удаления мероприятия
  const handleDelete = (id:string) => {
    setEventsState((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }

  // Функция отправки формы
  const handleFormSubmit = (event: IEvent) => {
    if (editingEvent) {
      setEventsState((prevEvents) =>
          prevEvents.map((e) => (e.id === event.id ? event : e))
      );
    } else {
      setEventsState((prevEvents) => [...prevEvents, event]);
    }
    setIsFormVisible(false); // Скрыть форму
  };



  return (
      <>
        <h1>Список мероприятий</h1>
        <EventList events={eventsState} handleEdit={handleEdit} handleDelete={handleDelete}/>
        <button onClick={handleAdd}>Добавить</button>

        {isFormVisible && (
            <Modal>
              <EventForm
                  event={editingEvent}
                  onSubmit={handleFormSubmit}
              />
            </Modal>
        )}
      </>
  )
}

export default App
