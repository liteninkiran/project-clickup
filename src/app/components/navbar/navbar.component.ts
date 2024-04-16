import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
    public config: IConfig[] = [
        {
            link: '/home',
            icon: 'home',
            text: 'Home',
        },
        {
            link: '/scratch',
            icon: 'color_lens',
            text: 'Scratch',
        },
    ];
}

interface IConfig {
    link: string,
    icon: string,
    text: string,
}
