import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PipGuidanceService } from './services/guidance.service';
import { GuidanceDataService } from './services/guidance.data.service';
import { pipGuidanceReducer, PipGuidanceEffects } from './store';
import { GuidesComponentsModule } from './components/components.module';
import { GuidesContainersModule } from './containers/containers.module';

@NgModule({
    imports: [
        GuidesContainersModule,
        GuidesComponentsModule,
        EffectsModule.forFeature([PipGuidanceEffects]),
        StoreModule.forFeature('guide', pipGuidanceReducer),
    ],
    providers: [
        PipGuidanceService,
        GuidanceDataService
    ],
})
export class GuidesModule { }
