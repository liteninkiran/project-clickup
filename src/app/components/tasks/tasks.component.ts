import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Task, TasksResponse } from '../../interfaces/tasks';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.scss',
    providers: [ClickUpService],
})
export class TasksComponent implements OnInit {

    public displayedColumns = [
        // 'id',
        // 'orderindex',
        'name',
        'status',
        'creator',
        'points',
    ];
    public expandedRow: Task | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Task>;
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
            .getTasks(this.id)
            .subscribe({
                next: (res: TasksResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(task: Task): void {
        if (task === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = task;
        }
    }

    private handleUpdateResponse(res: TasksResponse) {
        this.dataSource = new MatTableDataSource(res.tasks);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
            if (sortHeaderId === 'status') return data.status.orderindex;
            if (sortHeaderId === 'orderindex') return +data.orderindex;
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
