import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EntriesManagementComponent } from './components/entries-management/entries-management.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '', pathMatch: 'prefix', component: LayoutComponent, canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {
                path: 'admin', pathMatch: 'prefix', canActivate: [AdminGuard],
                children: [
                    { path: 'entries-management', component: EntriesManagementComponent },
                    { path: 'reports', component: ReportsComponent },
                ]
            },
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
