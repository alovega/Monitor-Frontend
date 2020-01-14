
export class SystemRecipient {
    escalationLevels: [];
    systemRecipientId: string;
    recipientId: string;
    userName: string;
}

export class SystemRecipientResponse {
    code: string;
    data: SystemRecipient;
    message: string;
}

export class Escalations {
    escalationLevelId: string;
    notificationTypeId: string;
    stateId: string;
}
export class SystemRecipientParams {
    recipientId: string;
    systemRecipientId: string;
    escalations: Escalations[];
}
