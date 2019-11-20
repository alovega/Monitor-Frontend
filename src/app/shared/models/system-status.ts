export class CurrentState {
    state: string;
    description: string;
}

export class SystemStatus {
    system_id: string;
    incidents: any[];
    current_state: CurrentState;
}

export class SystemStatusResponse {
    code: string;
    data: SystemStatus;
}
