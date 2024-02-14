import { User } from "./user.model";

export class Entry {
    id: string;
    user: User;
    date: Date;
    food: string;
    calories: number;

    constructor(entry: Entry) {
        this.id = entry.id;
        this.user = entry.user;
        this.date = new Date(entry.date);
        this.food = entry.food;
        this.calories = entry.calories;
    }
}

export interface CurrentUserEntries {
    date: Date;
    dailyTotalCalories: number;
    currentPercentage: number;
    items: Entry[];
}