import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportAverageCaloriesPerUser, ReportNoOfEntries } from '../models/reports.model';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {

    constructor(private httpClient: HttpClient) { }

    getNoOfEntries(): Promise<ReportNoOfEntries> {
        return this.httpClient.get<ReportNoOfEntries>(`Reports/GetNoOfEntries`).toPromise();
    }

    getAverageCaloriesPerUser(): Promise<ReportAverageCaloriesPerUser[]> {
        return this.httpClient.get<ReportAverageCaloriesPerUser[]>(`Reports/GetAverageCaloriesPerUser`).toPromise();
    }
}
