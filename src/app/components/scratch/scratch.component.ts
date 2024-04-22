import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data-service';
import { Contact } from './contact.type';

@Component({
    selector: 'app-scratch',
    styleUrls: ['scratch.component.scss'],
    templateUrl: 'scratch.component.html',
})
export class ScratchComponent implements OnInit {
    public displayedColumns: string[] = ['phone', 'name', 'email', 'website', 'address'];
    public dataSource!: MatTableDataSource<Contact>;

    @ViewChild(MatSort, { static: true }) public  sort!: MatSort;
    @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

    constructor(private dataService: DataService) { }

    public ngOnInit(): void {
        this.dataService.fetchPosts().subscribe(contacts => {
            this.dataSource = new MatTableDataSource(contacts);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }
}
