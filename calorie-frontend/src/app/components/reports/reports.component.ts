import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { ReportAverageCaloriesPerUser, ReportNoOfEntries } from '../../models/reports.model';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    public noOfEntriesReportData: ReportNoOfEntries | undefined;
    public reportAverageCaloriesPerUser: ReportAverageCaloriesPerUser[] | undefined;
    public report1Data: any;
    public report2Data: any;
    public horizontalOptions: any;
    public loading = false;

    constructor(private reportsService: ReportsService) { }

    async ngOnInit(): Promise<void> {
        await this.getReportsData();
        this.processReport1Data();
        this.processReport2Data();
        this.setHorizontalOptions();
    }

    private async getReportsData() {
        this.loading = true;
        this.noOfEntriesReportData = await this.reportsService.getNoOfEntries();
        this.reportAverageCaloriesPerUser = await this.reportsService.getAverageCaloriesPerUser();
        this.loading = false;
    }

    private processReport1Data() {
        this.report1Data = {
            labels: ['Number of added entries in the last 7 days vs. added entries the week before that'],
            datasets: [
                {
                    label: 'Last Seven Days Entries',
                    backgroundColor: '#42A5F5',
                    data: [this.noOfEntriesReportData?.lastSevenDaysEntries]
                },
                {
                    label: 'Previous Seven Days Entries',
                    backgroundColor: '#FFA726',
                    data: [this.noOfEntriesReportData?.previousSevenDaysEntries]
                }
            ]
        };
    }

    private processReport2Data() {
        this.report2Data = {
            labels: ['The average number of calories added per user for the last 7 days'],
            datasets: this.reportAverageCaloriesPerUser?.map(r =>
            ({
                label: r.user.emailAddress,
                backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                data: [r.averageCaloriesPerDayInPastSevenDays]
            }))

        };
    }

    private setHorizontalOptions() {
        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

}
