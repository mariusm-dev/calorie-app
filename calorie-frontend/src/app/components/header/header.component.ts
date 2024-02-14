import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private authService: AuthService) { }

    public currentUserIsAdmin: boolean = false;
    public items: MenuItem[] = [];

    ngOnInit(): void {
        this.currentUserIsAdmin = this.authService.currentUserIsAdmin;

        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                routerLink: 'dashboard'
            },
            {
                label: 'Admin',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'Entries Management',
                        icon: 'pi pi-book',
                        routerLink: '/admin/entries-management'
                    },     
                    {
                        label: 'Reports',
                        icon: 'pi pi-chart-pie',
                        routerLink: '/admin/reports'
                    }      
                ]
            }
        ];
    }

}
