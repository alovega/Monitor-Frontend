export class AvailabilitySummary {
    start_date: Date;
    end_date: Date;
    total_period: string;
    total_uptime: string;
    total_downtime: number;
    uptime_percentage: number;
    downtime_percentage: number;
    duration_since_downtime: number;
    incident_count: number;
}
