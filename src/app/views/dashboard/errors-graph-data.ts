export class ErrorsGraphData {
    labels: any[];
    datasets: any[];
}

export class ErrorsGraphDataResponse {
    code: string;
    data?: ErrorsGraphData;
    message?: string;
}
