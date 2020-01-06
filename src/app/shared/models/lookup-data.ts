import { State } from './state';
import { IncidentType } from './incident-type';
import { EscalationLevel } from './escalation-level';
import { NotificationType } from './notification-type';
import { EndpointType } from './endpoint-type';
import { EventType } from './event-type';
import { User } from 'src/app/views/users/user';
import { System } from './system';
import { Recipient } from 'src/app/views/recipient/recipient';

export class LookupData {
    states: State[];
    incident_types: IncidentType[];
    escalation_levels: EscalationLevel[];
    notification_types: NotificationType[];
    endpoint_types: EndpointType[];
    event_types: EventType[];
    users: User[];
    systems: System[];
    recipients: Recipient[];
    realtime_incident_states: State[];
    endpoint_states: State[];
    scheduled_incident_states: State[];
}

export class LookupDataResponse {
    code: string;
    data?: LookupData;
    message?: string;
}
