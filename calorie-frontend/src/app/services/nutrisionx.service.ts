import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NutritionXResponse } from '../models/nutritionx.model';

@Injectable({
    providedIn: 'root'
})
export class NutritionixService {

    private httpClient: HttpClient;

    constructor(httpBackend: HttpBackend) {
        this.httpClient = new HttpClient(httpBackend);
    }

    getFoods(key: string) {
        const headers = new HttpHeaders(environment.nutritionxSettings.headers);
        return this.httpClient.get<NutritionXResponse>(`${environment.nutritionxSettings.apiUrl}${key}`, { headers: headers }).toPromise();
    }
}
