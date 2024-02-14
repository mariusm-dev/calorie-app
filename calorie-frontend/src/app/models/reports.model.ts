import { User } from "src/app/models/user.model";

export interface ReportNoOfEntries {
    lastSevenDaysEntries: number;
    previousSevenDaysEntries: number;
}

export interface ReportAverageCaloriesPerUser {
    user: User;
    averageCaloriesPerDayInPastSevenDays: number;
}