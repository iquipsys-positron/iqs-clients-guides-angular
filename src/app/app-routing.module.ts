import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'iqs-libs-clientshell2-angular';

import { GuidesContainerComponent } from './guides/containers/guides-container/guides-container.component';

const appRoutes: Routes = [
    { path: '', component: GuidesContainerComponent, canActivate: [AuthGuard] },
    { path: '404', redirectTo: '' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

