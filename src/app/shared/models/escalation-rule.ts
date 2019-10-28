export interface EscalationRule {
    status: string;
    system_name: string;
    name: string;
    date_modified: string,
    eventtype?: string;
    escalation: string;
    system_id: string;
    duration: string;
    date_created: string;
    nth_event: number;
    rule_id: string;
    description: string;
}
