import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatProgressBarModule
} from '@angular/material';
import { PipSelectedModule } from 'pip-webui2-behaviors';
import { PipEmptyStateModule, PipRefItemModule } from 'pip-webui2-controls';
import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';

import { PipGuidanceListComponent } from './guidance-list.component';

@NgModule({
  declarations: [
    PipGuidanceListComponent
  ],
  imports: [
    PipDocumentLayoutModule,
    PipMediaModule,
    PipShadowModule,

    FormsModule,
    HttpClientModule,
    CommonModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,

    PipEmptyStateModule,
    PipRefItemModule,
    PipSelectedModule
  ],
  exports: [
    PipGuidanceListComponent
  ],
  providers: [],
})
export class PipGuidanceListModule { }
