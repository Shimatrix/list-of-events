import { useState } from "react";
import "./App.css";
import { EventForm, TEvent } from "./components/event-form/EventForm";
import { EventList } from "./components/event-list/EventList";

function App() {
    const [events, setEvents] = useState<TEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);

    return (
        <>
            <div>
                <h2 className="title">
                    {selectedEvent == null
                        ? "Добавление мероприятия"
                        : "Редактирование мероприятия"}
                </h2>{" "}
                <EventForm
                    curEvent={selectedEvent}
                    clearCurEvent={setSelectedEvent}
                    handlerAddEvent={(event) => {
                        setEvents([...events, event]);
                    }}
                    handleEditEvent={(data: TEvent) => {
                        setEvents(
                            events.map((item) =>
                                item.id === data.id ? data : item
                            )
                        );
                    }}
                ></EventForm>
                <h1 className="title">Список мероприятий</h1>
                <EventList
                    events={events}
                    handlerEditEvent={setSelectedEvent}
                    handlerRemoveEvent={(id: string) =>
                        setEvents(events.filter((item) => item.id !== id))
                    }
                ></EventList>
            </div>
        </>
    );
}

export default App;
