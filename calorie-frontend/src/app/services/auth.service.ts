import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private userService: UserService) {

    }
    public token: string = '';
    public currentUser: User | undefined;
    public currentUserIsAdmin = false;

    async signIn(token: string) {
        return new Promise<void>(async (resolve, reject) => {
            if (!token) {
                return reject('Invalid Token');
            }
            try {
                this.token = token;
                localStorage.setItem('token', token);
                const user = await this.userService.getCurrentUserData();
                this.currentUser = user;
                this.parseToken();
                return resolve();
            } catch (error) {
                localStorage.setItem('token', '');
                return reject('Invalid Token');
            }
        })
    }

    signOut() {
        this.token = '';
        this.currentUser = undefined;
        localStorage.setItem('token', '');
    }

    private parseToken(): void{
        try {
            const parsedToken = jwt_decode(this.token) as TokenModel;
            this.currentUserIsAdmin =  JSON.parse(parsedToken?.isAdmin);
        } catch (Error) {
        }
    }
}

export interface TokenModel {
    aud: string;
    isAdmin: string;
    iss: string;
    sub: string;
}
