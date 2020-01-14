export class GraphData {
    labels: any[];
    datasets: any[];
}

export class GraphDataResponse {
    code: string;
    data?: GraphData;
    message?: string;
}
