export class EscalationRule {
    id: string;
    name: string;
    description: string;
    nth_event: number;
    duration: string;
    system_id: string;
    event_type_name: string;
    escalation_level_name: string;
    state_name: string;
    date_created: string;
    date_modified: string;
}

export class EscalationRuleResponse {
    code: string;
    data?: EscalationRule;
    message?: string;
}

export class EscalationRulesResponse {
    code: string;
    data?: EscalationRule[];
    message?: string;
}
