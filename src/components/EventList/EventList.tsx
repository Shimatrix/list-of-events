import { ReactElement } from "react";
import { IEvent } from "../../utils/types.ts";
import { Event } from "../Event/Event.tsx";

interface EventListProps {
    events: IEvent[];
    handleEdit: (event: IEvent) => void;
    handleDelete: (id:string) => void;
}

export const EventList = (props: EventListProps): ReactElement => {
    return (
        <div>
            <ul>
                {props.events.map((event) => (
                    <li key={event.id}>
                        <Event event={event} handleEdit={props.handleEdit} handleDelete={props.handleDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
};