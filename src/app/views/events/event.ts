export class Event {
    id: string;
    /* tslint:disable */
    event_type_name: string;
    interface_name?: string;
    method?: string;
    request?: string;
    response?: string;
    stack_trace?: string;
    description?: string;
    code?: string;
    state_name?: string;
    date_created: Date;
    date_modified: Date;
}

export class EventResponse {
    code: string;
    data?: Event;
    message?: string;
}

export class EventsResponse {
    code: string;
    data?: Event[];
    message?: string;
}
