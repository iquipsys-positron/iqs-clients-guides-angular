import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { GuidesModule } from './guides/guides.module';
import { IqsShellContainerComponent, IqsShellModule/*, CustomRouterStateSerializer*/ } from 'iqs-libs-clientshell2-angular';
import { GuidanceDataService } from './guides/services/guidance.data.service';
// import { RouterStateSerializer } from '@ngrx/router-store';

@NgModule({
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
      }),
      // application modules
      IqsShellModule.forRoot(),
      AppRoutingModule,
      GuidesModule
  ],
  bootstrap: [IqsShellContainerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    //   {
    //       provide: RouterStateSerializer,
    //       useClass: CustomRouterStateSerializer
    //   },
      GuidanceDataService
  ]
})
export class AppModule { }
