import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Team, TeamsResponse } from '../../interfaces/teams';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html',
    styleUrl: './teams.component.scss',
    providers: [ClickUpService],
})
export class TeamsComponent implements OnInit {
    public displayedColumns = ['name', 'members', 'colour', 'actions'];
    public expandedRow: Team | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Team>;

    @ViewChild(MatSort, { static: true }) public  sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

    constructor(
        readonly clickUpService: ClickUpService,
        private _snackBar: MatSnackBar,
    ) { }

    public ngOnInit(): void {
        this.loadData();
    }

    public loadData(): void {
        this.apiLoaded = false;
        this.clickUpService
            .loadTeams()
            .subscribe({
                next: (res: TeamsResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(team: Team): void {
        if (team === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = team;
        }
    }

    private handleUpdateResponse(res: TeamsResponse) {
        this.dataSource = new MatTableDataSource(res.teams);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
