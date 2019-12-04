export class Recipient {
    userId: string;
    phoneNumber: string;
    stateId: string;
}

export class RecipientData {
    code: string;
    data: Recipient;
    message: string;
}

export class RecipientLookup {
    id: string;
    userName: string;
}
