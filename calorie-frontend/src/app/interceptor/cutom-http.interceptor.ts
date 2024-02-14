import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private messageService: MessageService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handle(request, next)).pipe(tap(() => { }, (err: any) => {
            console.error(err);
            if (err.status === 403) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You are not authorised to process this request!' });
            } else {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A server error has occured while processing the request!' });
            }
        }));
    }

    async handle(request: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.authService.token;
        const fullApiUrl = `${environment.apiUrl}/${request.url}`;
        request = request.clone({
            url: fullApiUrl,
            setHeaders: {
                Authorization: 'Bearer ' + accessToken
            }
        });
        return next.handle(request).toPromise();
    }
}
