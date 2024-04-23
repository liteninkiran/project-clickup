import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { List, ListsResponse } from '../../interfaces/lists';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.scss',
    providers: [ClickUpService],
})
export class ListsComponent implements OnInit {

    public displayedColumns = [
        'id',
        'orderindex',
        'name',
        'status',
        // 'priority',
        'permission_level',
        // 'assignee',
        // 'folder',
        // 'space',
        // 'start_date',
        // 'due_date',
        'task_count',
        'override_statuses',
        'archived',
        'tasks',
    ];
    public expandedRow: List | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<List>;
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
            .getLists(this.id)
            .subscribe({
                next: (res: ListsResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(list: List): void {
        if (list === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = list;
        }
    }

    private handleUpdateResponse(res: ListsResponse) {
        this.dataSource = new MatTableDataSource(res.lists);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
            if (sortHeaderId == 'list_count') return data.lists.length;
            return data[sortHeaderId as keyof typeof data];
        };
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
