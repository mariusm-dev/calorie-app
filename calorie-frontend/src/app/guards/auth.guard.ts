import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        public router: Router,
        private authService: AuthService,
        private userService: UserService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const token = localStorage.getItem('token');
            if (!token) {
                this.router.navigateByUrl('login');
                return resolve(false);
            }
            if (!this.authService.currentUser) {
                try {
                    await this.authService.signIn(token);
                    return resolve(true);
                } catch (err) {
                    this.router.navigateByUrl('login');
                    return resolve(false);
                }
            } 
            return resolve(true);
        })
    }
}
