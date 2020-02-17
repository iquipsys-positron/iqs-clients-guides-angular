import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatTooltipModule,
  MatDividerModule,
  MatSelectModule,
  MatChipsModule,
  MatProgressBarModule,
  MatButtonToggleModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { PipActionListModule, PipButtonToggleGroupModule } from 'pip-webui2-buttons';
import { PipEmptyStateModule, PipColorPickerModule } from 'pip-webui2-controls';
import { PipDocumentListModule } from 'pip-webui2-documents';
import { PipPictureModule, PipCollageModule, PipPictureEditModule } from 'pip-webui2-pictures';
import { PipDocumentLayoutModule, PipMediaModule, PipShadowModule } from 'pip-webui2-layouts';

import { PipGuidanceUpdateComponent } from './guidance-update.component';

@NgModule({
  declarations: [
    PipGuidanceUpdateComponent
  ],
  imports: [
    PipDocumentLayoutModule,
    PipMediaModule,
    PipShadowModule,
    PipButtonToggleGroupModule,
    FlexLayoutModule,

    TranslateModule,
    FormsModule,
    HttpClientModule,
    CommonModule,

    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatProgressBarModule,
    PipPictureModule,
    PipActionListModule,
    PipDocumentListModule,
    PipCollageModule,
    PipPictureEditModule,
    PipColorPickerModule,

    PipEmptyStateModule
  ],
  exports: [
    PipGuidanceUpdateComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PipGuidanceUpdateModule { }
