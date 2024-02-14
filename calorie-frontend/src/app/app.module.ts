// agnular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// primeng
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextareaModule } from 'primeng/inputtextarea';

// local
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './interceptor/cutom-http.interceptor';
import { FoodDialogueComponent } from './components/food-dialogue/food-dialogue.component';
import { NewUserDialogueComponent } from './components/new-user-dialogue/new-user-dialogue.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { EntriesManagementComponent } from './components/entries-management/entries-management.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DashboardComponent,
        LayoutComponent,
        LoginComponent,
        FoodDialogueComponent,
        NewUserDialogueComponent,
        UserProfileComponent,
        ReportsComponent,
        EntriesManagementComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CardModule,
        InputTextModule,
        MenubarModule,
        MenuModule,
        TableModule,
        ButtonModule,
        CalendarModule,
        DialogModule,
        ProgressSpinnerModule,
        ToastModule,
        SkeletonModule,
        AutoCompleteModule,
        DropdownModule,
        ConfirmDialogModule,
        TabViewModule,
        ChartModule,
        ProgressBarModule,
        InputTextareaModule
    ],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
