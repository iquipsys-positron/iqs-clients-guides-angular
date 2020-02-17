import { NgModule } from '@angular/core';
import { PipGuidanceListModule } from './guidance-list/guidance-list.module';
import { PipGuidanceUpdateModule } from './guidance-update/guidance-update.module';
import { LangFilterPipe } from './pipes/lang-filter.pipe';


@NgModule({
  declarations: [LangFilterPipe],
  imports: [
    PipGuidanceListModule,
    PipGuidanceUpdateModule
  ] 
})
export class GuidesComponentsModule { }