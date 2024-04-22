import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Space, SpacesResponse } from '../../interfaces/spaces';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

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
        'avatar',
        'statuses',
        'private',
        'admin_can_manage',
        'multiple_assignees',
        'archived',
        'folders',
    ];
    public expandedRow: Space | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Space>;
    public id: number = 0;

    @ViewChild(MatSort, { static: true }) public  sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

    constructor(
        readonly clickUpService: ClickUpService,
        private _snackBar: MatSnackBar,
        private route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.loadData();
    }

    public loadData(): void {
        this.apiLoaded = false;
        this.clickUpService
            .getSpaces(this.id)
            .subscribe({
                next: (res: SpacesResponse) => this.handleUpdateResponse(res),
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

    private handleUpdateResponse(res: SpacesResponse) {
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
