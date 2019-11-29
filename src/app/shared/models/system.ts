export class System {
    id: string;
    name: string;
    description: string;
    admin_id: string;
    code: string;
    version: string;
    date_created: Date;
    date_modified: Date;
    state_id: string;
}

export class SystemResponse {
    code: string;
    data?: System;
    message?: string;
}

export class SystemsResponse {
    code: string;
    data?: System[];
    message?: string;
}
