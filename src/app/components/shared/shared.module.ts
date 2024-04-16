import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
    declarations: [
        ButtonComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    exports: [
        ButtonComponent,
    ],
})
export class SharedModule { }
