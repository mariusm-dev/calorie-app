import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserEntries, Entry } from '../models/entry.model';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    constructor(private httpClient: HttpClient) { }

    saveEntry(entry: Entry): Promise<void> {
        return this.httpClient.post<void>(`Entry`, entry).toPromise();
    }

    saveAdminEntry(entry: Entry): Promise<void> {
        return this.httpClient.post<void>(`Entry/adminSave`, entry).toPromise();
    }

    deleteEntry(id: string): Promise<void> {
        return this.httpClient.delete<void>(`Entry/${id}`, ).toPromise();
    }

    getEntries(): Promise<Entry[]> {
        return this.httpClient.get<Entry[]>(`Entry`).toPromise();
    }

    getCurrentUserEntries(): Promise<CurrentUserEntries[]> {
        return this.httpClient.get<CurrentUserEntries[]>(`Entry/currentUserEntries`).toPromise();
    }

    getCurrentUserCaloriesByDate(date: string): Promise<number> {
        return this.httpClient.get<number>(`Entry/currentUserCaloriesByDate`, { params: { date } as any}).toPromise();
    }
}
