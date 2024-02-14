import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService,
        private messageService: MessageService,
        private router: Router) { }

    public token: string = '';

    ngOnInit(): void {
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MTc1MzM4MC1GMzFELTQ0NEItQUNCRS0yNUI1Q0ZDNThEN0IiLCJpc0FkbWluIjoidHJ1ZSIsImlzcyI6Im1hcml1cy5tYXJpbi5kZXYiLCJhdWQiOiJ0b3B0YWwifQ.74R-HnA9CdpAQWg8-qOr9r6aPdE-DCcMaYzmDVGorLM';
    }

    async submit() {
        if (!this.token) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid token' });
            return;
        }
        try {
            await this.authService.signIn(this.token);
        } catch (err) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid token' });
        }

        this.router.navigateByUrl('');
    }
}
