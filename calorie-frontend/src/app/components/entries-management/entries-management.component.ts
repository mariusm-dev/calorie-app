import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Entry } from 'src/app/models/entry.model';
import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';
import { FoodDialogueComponent } from '../food-dialogue/food-dialogue.component';
import { NewUserDialogueComponent } from '../new-user-dialogue/new-user-dialogue.component';

@Component({
    selector: 'app-entries-management',
    templateUrl: './entries-management.component.html',
    styleUrls: ['./entries-management.component.css']
})
export class EntriesManagementComponent implements OnInit {

    @ViewChild('d', { static: false }) dialogue: FoodDialogueComponent | undefined;
    @ViewChild('nu', { static: false }) newUserdialogue: NewUserDialogueComponent | undefined;

    public entries: Entry[] = [];
    public loading = false;

    constructor(private authService: AuthService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private entryService: EntryService) { }

    async ngOnInit(): Promise<void> {
        await this.getData();
    }

    async getData() {
        this.loading = true;
        const result = await this.entryService.getEntries();
        this.entries = result.map(r => new Entry(r));
        this.loading = false;
    }

    openDialog(): void {
        if (!this.dialogue) { return }
        this.dialogue.showDialog(null);
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
}
