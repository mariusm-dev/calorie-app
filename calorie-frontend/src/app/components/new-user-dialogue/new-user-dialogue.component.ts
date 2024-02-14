import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Token, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-new-user-dialogue',
    templateUrl: './new-user-dialogue.component.html',
    styleUrls: ['./new-user-dialogue.component.css']
})
export class NewUserDialogueComponent {

    @ViewChild('tokenEl', { static: false }) tokenEl: ElementRef | undefined;

    public dialogVisible = false;
    public saveInProgress = false;
    public formGroup: FormGroup | undefined;
    public newUserToken: Token = { token: '' };
    public submited = false;

    constructor(private formBuilder: FormBuilder,
        private userService: UserService,
        private messageService: MessageService) { }

    async showDialog() {
        this.dialogVisible = true;
        this.initForm();
    }

    hideDialogue() {
        this.newUserToken = { token: '' };
        this.dialogVisible = false;
        this.submited = false;
    }

    async submit(): Promise<void> {
        this.submited = true;
        if (this.formGroup?.valid) {
            const newUser: User = Object.assign({}, this.formGroup.value);
            try {
                this.saveInProgress = true;
                this.formGroup.disable();
                this.newUserToken = await this.userService.getNewUserToken(newUser);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Token successfully generated' });
            } catch (ex) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token could not be generated!' });
            } finally {
                this.saveInProgress = false;
                this.formGroup.enable();
            }
        }
    }

    copyToClipboard() {
        this.tokenEl?.nativeElement.select();
        document.execCommand('copy');
        this.tokenEl?.nativeElement.setSelectionRange(0, 0);
        this.hideDialogue();
    }

    private initForm(): void {
        this.formGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required], null),
            emailAddress: new FormControl('', [Validators.required, Validators.email], null),
        });
    }
}
