import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Folder, FoldersResponse } from '../../interfaces/folders';
import { ClickUpService } from '../../services/click-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-folders',
    templateUrl: './folders.component.html',
    styleUrl: './folders.component.scss',
    providers: [ClickUpService],
})
export class FoldersComponent implements OnInit {

    public displayedColumns = [
        'id',
        'orderindex',
        'name',
        'permission_level',
        'list_count',
        'task_count',
        'statuses',
        'override_statuses',
        'hidden',
        'archived',
        'lists',
    ];
    public expandedRow: Folder | null = null;
    public apiLoaded = false;
    public dataSource!: MatTableDataSource<Folder>;
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
            .getFolders(this.id)
            .subscribe({
                next: (res: FoldersResponse) => this.handleUpdateResponse(res),
                error: (err: HttpErrorResponse) => this.handleErrorResponse(err),
            });
    }

    public onToggleRow(folder: Folder): void {
        if (folder === this.expandedRow) {
            this.expandedRow = null;
        }
        else {
            this.expandedRow = folder;
        }
    }

    private handleUpdateResponse(res: FoldersResponse) {
        this.dataSource = new MatTableDataSource(res.folders);
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
