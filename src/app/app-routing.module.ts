import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScratchComponent } from './components/scratch/scratch.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspacesComponent } from './components/workspaces/workspaces.component';
import { SpacesComponent } from './components/spaces/spaces.component';
import { FoldersComponent } from './components/folders/folders.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'workspaces',
        component: WorkspacesComponent,
    },
    {
        path: 'workspace/:id/spaces',
        component: SpacesComponent,
    },
    {
        path: 'space/:id/folders',
        component: FoldersComponent,
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
