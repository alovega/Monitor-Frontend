export class IncidentUpdate {
    id: string;
    description: string;
    priority_level: number;
    escalation_level_id: string;
    user_id: string;
    date_created: Date;
    date_modified: Date;
    state_name: string;
    state_id: string;
}


export class Incident {
    id: string;
    name: string;
    description: string;
    priority_level: number;
    system_id: string;
    incident_type_name: string;
    event_type_id: string;
    state_id: string;
    state_name: string;
    incident_id: string;
    incident_updates: IncidentUpdate[];
    scheduled_for?: Date;
    scheduled_until?: Date;
    date_created: Date;
    date_modified: Date;
}

export class IncidentResponse {
    code: string;
    data?: Incident;
    message?: string;
}
