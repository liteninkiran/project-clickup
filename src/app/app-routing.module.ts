import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScratchComponent } from './components/scratch/scratch.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'scratch',
        component: ScratchComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
