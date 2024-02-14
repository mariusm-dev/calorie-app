import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    public items: MenuItem[] = [];
    public userName: User | undefined;
    public userAcronim: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router) { }

    async ngOnInit(): Promise<void> {
        this.userName = await this.authService?.currentUser;
        this.userAcronim = `${this.userName?.name.split(' ').map(i => i.charAt(0).toUpperCase()).join('')}`.substring(0,2);
        this.items = [
            {
                label: `${this.userName?.name}`,
                items: [
                    {
                        label: 'Sign out',
                        icon: 'pi pi-fw pi-power-off',
                        command: () => this.signout()
                    }
                ]
            }
        ];
    }

    async signout(): Promise<void> {
        try {
            this.authService.signOut();
        } catch (err) {
            console.log(err);
        } finally {
            await this.router.navigateByUrl('login');
        }
    }
}
