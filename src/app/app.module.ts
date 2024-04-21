// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { ScratchComponent } from './components/scratch/scratch.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './components/shared/shared.module';
import { TeamsComponent } from './components/teams/teams.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ScratchComponent,
        TeamsComponent,
        NavbarComponent,
    ],
    imports: [
        // Built-in Modules
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,

        // Routing Modules
        AppRoutingModule,

        // Shared Modules
        MaterialModule,
        SharedModule,
    ],
    providers: [
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
