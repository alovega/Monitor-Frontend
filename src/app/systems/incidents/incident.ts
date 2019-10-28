export class Incident {
    name: string;
    description: string;
    incident_id: string;
    system_id: string;
    priority_level: string;
    type: string;
    status: string;
    state ?: string;
    affected_system: string;
    date_created: string;
    date_modified: string;
    scheduled_for ?: string;
    scheduled_until ?: string;
    eventtype ?: string;
    incident_updates: any[];
    escalation_level ?: any;
    incident_type ?: any;
    user ?: any;
}
