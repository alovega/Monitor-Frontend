export class Endpoint {
    id: string;
    name: string;
    description: string;
    // tslint:disable-next-line: variable-name
    endpoint_id: string;
    url: string;
    // tslint:disable-next-line: variable-name
    system_id: string;
    // tslint:disable-next-line: variable-name
    optimal_response_time: number;
    // tslint:disable-next-line: variable-name
    endpoint_type: string;
    state: string;
}

export class EndpointData {
    code: string;
    message: string;
    data: Endpoint[];
}
