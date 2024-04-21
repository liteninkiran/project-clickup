import { Component, OnInit } from '@angular/core';
import { ClickUpService } from '../../services/click-up.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Team, TeamResponse } from '../../interfaces/teams';

@Component({
    selector: 'app-scratch',
    templateUrl: './scratch.component.html',
    styleUrl: './scratch.component.scss',
    providers: [ClickUpService],
})
export class ScratchComponent implements OnInit {
    public displayedColumns = ['name', 'members', 'colour', 'actions'];
    public teams: Team[] | undefined;
    public expandedTeam: Team | null = null;
    public apiLoaded = false;

    constructor(
        readonly clickUpService: ClickUpService,
        private _snackBar: MatSnackBar,
    ) { }

    public ngOnInit(): void {
        this.loadTeams();
    }

    public loadTeams(): void {
        this.apiLoaded = false;
        this.clickUpService
            .loadTeams()
            .subscribe({
                next: (res: TeamResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleTeam(team: Team): void {
        if (team === this.expandedTeam) {
            this.expandedTeam = null;
        }
        else {
            this.expandedTeam = team;
        }
    }

    public onActionClick(team: Team): void {

    }

    private handleUpdateResponse(res: TeamResponse) {
        this.teams = res.teams;
        this.apiLoaded = true;
    }

    private handleErrorResponse(err: HttpErrorResponse) {
        this.showRoleSnackBar(err.message, 0);
    }

    private showRoleSnackBar(res: any, duration: number) {
        this.showSnackBars(res, duration);
    }

    private showSnackBars(message: string, duration: number) {
        const config = new MatSnackBarConfig();
        config.duration = duration;
        const action = 'X';
        this._snackBar.open(message, action, config);
    }
}
