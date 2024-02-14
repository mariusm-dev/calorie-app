import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token, User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUsers(): Promise<User[]> {
        return this.httpClient.get<User[]>(`User`).toPromise();
    }

    getCurrentUserData(): Promise<User> {
        return this.httpClient.get<User>(`User/currentUser`).toPromise();
    }

    getNewUserToken(newUser: User): Promise<Token> {
        return this.httpClient.post<Token>(`User/getNewUserToken`, newUser).toPromise();
    }
}
