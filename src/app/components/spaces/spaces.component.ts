import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Space, SpaceResponse } from '../../interfaces/spaces';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-spaces',
    templateUrl: './spaces.component.html',
    styleUrl: './spaces.component.scss',
    providers: [ClickUpService],
})
export class SpacesComponent implements OnInit {
    public displayedColumns = [
        'id',
        'name',
        'color',
        'private',
        'avatar',
        'admin_can_manage',
        'statuses',
        'multiple_assignees',
        'features',
        'archived',
    ];
    public expandedRow: Space | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Space>;

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
            .loadSpaces(4543171)
            .subscribe({
                next: (res: SpaceResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(space: Space): void {
        if (space === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = space;
        }
    }

    private handleUpdateResponse(res: SpaceResponse) {
        this.dataSource = new MatTableDataSource(res.spaces);
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
