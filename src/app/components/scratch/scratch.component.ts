import { Component, OnInit } from '@angular/core';
import { ClickUpService } from '../../services/click-up.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Team, TeamResponse } from '../../interfaces/teams';

@Component({
    selector: 'app-scratch',
    templateUrl: './scratch.component.html',
    styleUrl: './scratch.component.scss',
    providers: [ClickUpService],
})
export class ScratchComponent implements OnInit {
    public teams: Team[] | undefined;
    public apiLoaded = false;
    public form = this.fb.group({
        apiKey: ['', {
            validators: [
                Validators.required,
            ],
        }],
    });

    constructor(
        readonly clickUpService: ClickUpService,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar,
    ) { }

    public ngOnInit(): void {

    }

    public loadTeams(): void {
        this.apiLoaded = false;
        this.clickUpService
            .loadTeams(this.form.value.apiKey ?? '')
            .subscribe({
                next: (res: TeamResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    private handleUpdateResponse(res: TeamResponse) {
        console.log(res.teams);
        this.teams = res.teams;
        this.showRoleSnackBar('Finished', 2000);
    }

    private handleErrorResponse(err: HttpErrorResponse) {
        this.showRoleSnackBar(err.message, 0);
    }

    private showRoleSnackBar(res: any, duration: number) {
        this.showSnackBars(res, duration);
        this.apiLoaded = true;
    }

    private showSnackBars(message: string, duration: number) {
        const config = new MatSnackBarConfig();
        config.duration = duration;
        const action = 'X';
        this._snackBar.open(message, action, config);
    }
}
