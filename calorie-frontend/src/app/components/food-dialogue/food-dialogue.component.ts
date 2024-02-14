import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Entry } from 'src/app/models/entry.model';
import { NutritionXResponse } from 'src/app/models/nutritionx.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EntryService } from 'src/app/services/entry.service';
import { NutritionixService } from 'src/app/services/nutrisionx.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-food-dialogue',
    templateUrl: './food-dialogue.component.html',
    styleUrls: ['./food-dialogue.component.css']
})
export class FoodDialogueComponent implements OnInit {

    @Output() refreshData = new EventEmitter<void>();

    public dialogVisible = false;
    public currentEntry: Entry | undefined;
    public saveInProgress = false;
    public loading = false;
    public formGroup: FormGroup | undefined;
    public currentDateCalories: number = 0;
    public currentUser: User | undefined;
    public dateChangeSubscription: Subscription | undefined;
    public caloriesChangeSubscription: Subscription | undefined;
    public foodResults: any[] = [];
    public nutrinionXRespose: NutritionXResponse | undefined;
    public users: User[] = [];
    public isAdminRoute = false;
    public progressPercentage: number = 0;
    public submited = false;

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private entryService: EntryService,
        private router: Router,
        private nutritionixService: NutritionixService,
        private messageService: MessageService) { }

    async ngOnInit(): Promise<void> {
        this.currentUser = this.authService.currentUser;
        this.isAdminRoute = this.router.url.indexOf('admin') !== -1;
        if (this.isAdminRoute) {
            this.getUsers();
        }
    }

    async showDialog(entry: Entry | null): Promise<void> {
        this.dialogVisible = true;
        this.currentEntry = Object.assign({}, entry);
        this.initForm();
        if (!this.isAdminRoute) {
            this.subscribeToDateChange();
            this.subscribeToCaloriesChange();
            this.getCurrentDateCalories(this.formGroup?.value.date);
        }
    }

    hideDialogue() {
        this.dialogVisible = false;
        this.dateChangeSubscription?.unsubscribe();
        this.caloriesChangeSubscription?.unsubscribe();
        this.submited = false;
    }

    async submit(): Promise<void> {
        this.submited = true;
        if (!this.formGroup?.valid && this.formGroup?.controls) {
            Object.keys(this.formGroup.controls).forEach(key => {
                this.formGroup?.controls[key].markAsDirty();
            });
            return;
        }

        const entry: Entry = Object.assign({}, this.formGroup?.value);
        if (this.currentEntry?.id) {
            entry.id = this.currentEntry.id;
        }

        try {
            this.saveInProgress = true;
            this.formGroup?.disable();
            if (this.isAdminRoute) {
                await this.entryService.saveAdminEntry(entry);
            } else {
                await this.entryService.saveEntry(entry);
            }
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Entry saved successfully' });
            this.refreshData.emit();
            this.hideDialogue();
        } catch (ex) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Entry could not be saved!' });
        } finally {
            this.saveInProgress = false;
            this.formGroup?.enable();
        }
    }

    async searchFood(key: string) {
        this.nutrinionXRespose = await this.nutritionixService.getFoods(key);
        this.foodResults = this.nutrinionXRespose.branded.map(r => r.food_name);
    }

    onFoodSelected() {
        const calories = this.nutrinionXRespose?.branded.find(r => r.food_name === this.formGroup?.value.food)?.nf_calories;
        this.formGroup?.controls.calories.setValue(Math.trunc(calories ?? 0));
    }

    private initForm(): void {
        this.formGroup = this.formBuilder.group({
            date: new FormControl(this.currentEntry?.date ?? new Date(), [Validators.required], null),
            food: new FormControl(this.currentEntry?.food ?? '', [Validators.required], null),
            calories: new FormControl(this.currentEntry?.calories ?? null, [Validators.required], null),
        });

        if (this.isAdminRoute) {
            this.formGroup.addControl('user', new FormControl(this.currentEntry?.user?.id ?? null, [Validators.required], null));
        }
        this.getProgressPercendage();
    }

    private subscribeToDateChange(): void {
        this.dateChangeSubscription = this.formGroup?.controls.date.valueChanges.subscribe(async newValue => {
            if (!this.isSameDate((newValue as Date), this.formGroup?.value.date)) {
                await this.getCurrentDateCalories(newValue);
            }
        });
    }

    private subscribeToCaloriesChange(): void {
        this.caloriesChangeSubscription = this.formGroup?.controls.calories.valueChanges.subscribe(async newValue => {
            this.currentDateCalories = this.currentDateCalories + newValue - this.formGroup?.value.calories;
            this.getProgressPercendage();
        });
    }

    private async getCurrentDateCalories(date: Date) {
        this.loading = true;
        if (date) {
            this.currentDateCalories = await this.entryService.getCurrentUserCaloriesByDate(date.toISOString());
        } else {
            this.currentDateCalories = 0;
        }
        if (this.formGroup?.value.calories && this.currentEntry?.id && !this.isSameDate(this.currentEntry?.date, date)) {
            this.currentDateCalories += this.formGroup?.value.calories;
        }

        this.getProgressPercendage();
        this.loading = false;
    }

    private getProgressPercendage() {
        if (!this.currentUser) { return }
        this.progressPercentage = parseFloat((this.currentDateCalories / this.currentUser?.caloriesLimit * 100).toFixed(2));
    }

    private async getUsers() {
        this.users = await this.userService.getUsers();
    }

    private isSameDate(date1?: Date, date2?: Date) {
        return date1?.getDate() === date2?.getDate() && 
                date1?.getMonth() === date2?.getMonth() &&
                 date1?.getFullYear() === date2?.getFullYear();
    }
}
