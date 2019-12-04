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
