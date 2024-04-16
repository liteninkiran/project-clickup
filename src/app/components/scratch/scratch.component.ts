import { Component, OnInit } from '@angular/core';
import { ClickUpService } from '../../services/click-up.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'app-scratch',
    templateUrl: './scratch.component.html',
    styleUrl: './scratch.component.scss',
    providers: [ClickUpService],
})
export class ScratchComponent implements OnInit {
    public apiLoaded = false;

    constructor(
        readonly clickUpService: ClickUpService,
        private _snackBar: MatSnackBar,
    ) { }

    public ngOnInit(): void {

    }

    public refreshDataFromApi(): void {
        this.apiLoaded = false;
        this.clickUpService
            .loadDataFromApi()
            .subscribe((res: any) => this.showRoleSnackBar(res));
    }

    private showRoleSnackBar(res: any) {
        console.log(res);
        this.showSnackBars('Finished');
        this.apiLoaded = true;
    }

    private showSnackBars(message: string) {
        const config = new MatSnackBarConfig();
        config.duration = 2000;
        const action = 'X';
        this._snackBar.open(message, action, config);
    }
}
