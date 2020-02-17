import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
    AuthGuard
} from 'iqs-libs-clientshell2-angular';
import { GuidesContainerComponent } from './containers/guides-container/guides-container.component';

export const routes: Routes = [
  { path: '', component: GuidesContainerComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }
