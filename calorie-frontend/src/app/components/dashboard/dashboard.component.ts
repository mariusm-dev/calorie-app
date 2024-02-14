import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CurrentUserEntries, Entry } from 'src/app/models/entry.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';
import { FoodDialogueComponent } from '../food-dialogue/food-dialogue.component';
import { NewUserDialogueComponent } from '../new-user-dialogue/new-user-dialogue.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    @ViewChild('d', { static: false }) dialogue: FoodDialogueComponent | undefined;
    @ViewChild('nu', { static: false }) newUserdialogue: NewUserDialogueComponent | undefined;

    public currentUser: User | undefined;
    public entries: CurrentUserEntries[] = [];
    public totalCaloriesDate = new Date();
    public progressPercentageValue = 0;
    public loading = false;


    constructor(private authService: AuthService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private entryService: EntryService) { }

    async ngOnInit(): Promise<void> {
        this.currentUser = this.authService.currentUser;
        await this.getData();
    }

    async getData() {
        this.loading = true;
        const result = await this.entryService.getCurrentUserEntries();
        result.forEach(r => {
            r.currentPercentage = this.getProgressPercendage(r.dailyTotalCalories)?? 0;
            r.items = r.items.map(i => new Entry(i))
        });
        this.entries = result;
        this.loading = false;
    }

    openDialog(): void {
        if (!this.dialogue) { return }
        this.dialogue.showDialog(null);
    }

    openInviteDialog(): void {
        if (!this.newUserdialogue) { return }
        this.newUserdialogue.showDialog();
    }

    edit(entry: Entry): void {
        if (!this.dialogue) { return }
        this.dialogue.showDialog(entry);
    }

    delete(entry: Entry): void {
        this.confirmationService.confirm({
            message: 'Do you want to delete this entry?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: async () => {
                try {
                    await this.entryService.deleteEntry(entry.id);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entry deleted successfully' });
                    await this.getData();
                } catch (err) {
                    this.messageService.add({ severity: 'error', summary: 'error', detail: 'Entry could not be deleted!' });
                }
            }
        });
    }

    getProgressPercendage(currentValue: number) {
        if (!this.currentUser) { return }
        return parseFloat((currentValue / this.currentUser?.caloriesLimit * 100).toFixed(2));
    }
}
