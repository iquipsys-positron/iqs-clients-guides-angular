import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatProgressBarModule,
  MatListModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { PipEmptyStateModule, PipSliderModule } from 'pip-webui2-controls';
import { PipDocumentListModule } from 'pip-webui2-documents';
import { PipFileUploadModule, PipFileUploadService } from 'pip-webui2-files';
import { PipDocumentLayoutModule, PipMediaModule, PipMenuLayoutModule, PipShadowModule, PipScrollableModule } from 'pip-webui2-layouts';
import { PipNavService, PipNavModule } from 'pip-webui2-nav';
import { GuidesContainerComponent } from './guides-container.component';
import { GuidanceDeleteDialog } from '../../components/guidance-delete-dialog/guidance-delete-dialog';
import { GuidanceReviewDialog } from '../../components/guidance-review-dialog/guidance-review-dialog';
import { PipGuidanceUpdateModule } from '../../components/guidance-update/guidance-update.module';
import { PipGuidanceListModule } from '../../components/guidance-list/guidance-list.module';
import { PipGuidanceEffects } from '../../store/guidance.effects';
import { pipGuidanceReducer, InitialPipGuidanceState } from '../../store/guidance.reducer';
import { PipGuidanceService } from '../../services/guidance.service';
import { IqsAskDialogComponent, IqsAskDialogModule } from 'iqs-libs-clientshell2-angular';

@NgModule({
  declarations: [
    GuidesContainerComponent,
    GuidanceDeleteDialog,
    GuidanceReviewDialog
  ],
  entryComponents: [
    GuidanceReviewDialog,
    IqsAskDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDialogModule,

    PipMediaModule,
    PipMenuLayoutModule,
    PipScrollableModule,
    PipShadowModule,
    PipEmptyStateModule,
    PipDocumentLayoutModule,
    PipDocumentListModule,
    PipSliderModule,
    PipFileUploadModule,

    PipGuidanceUpdateModule,
    PipGuidanceListModule,
    PipNavModule,
    IqsAskDialogModule,

    EffectsModule.forFeature([
      PipGuidanceEffects
    ]),
    StoreModule.forFeature(
      'guidance',
      pipGuidanceReducer,
      {
        initialState: InitialPipGuidanceState
      }
    ),
  ],
  exports: [
    GuidesContainerComponent
  ],
  providers: [
    PipNavService,
    // GuidanceAction,
    PipFileUploadService,
    PipGuidanceService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuidesContainerModule { }
