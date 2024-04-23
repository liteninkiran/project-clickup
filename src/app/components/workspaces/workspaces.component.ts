import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Workspace, WorkspacesResponse } from '../../interfaces/workspaces';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-workspaces',
    templateUrl: './workspaces.component.html',
    styleUrl: './workspaces.component.scss',
    providers: [ClickUpService],
})
export class WorkspacesComponent implements OnInit {
    public displayedColumns = ['name', 'members', 'colour', 'actions'];
    public expandedRow: Workspace | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Workspace>;

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
            .getWorkspaces()
            .subscribe({
                next: (res: WorkspacesResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(workspace: Workspace): void {
        if (workspace === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = workspace;
        }
    }

    private handleUpdateResponse(res: WorkspacesResponse) {
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
