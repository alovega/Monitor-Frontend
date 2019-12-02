export class Recipient {
    recipientId: string;
    userId: string;
    phoneNumber: string;
    stateId: string;
}

export class RecipientData {
    code: string;
    data: Recipient;
    message: string;
}
