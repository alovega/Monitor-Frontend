export class WidgetData {
    reported_events: number;
    open_incidents: number;
    scheduled_events: number;
    closed_incidents: number;
}

export class WidgetDataResponse {
    code: string;
    data: WidgetData;
}
