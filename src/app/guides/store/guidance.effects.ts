import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { findIndex } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IqsApplicationsDataService, EntityState } from 'iqs-libs-clientshell2-angular';
import { PipFileUploadService, dataURItoBlob } from 'pip-webui2-files';

import * as fromGuidanceActions from './guidance.action';
import { Guidance, GuidePage } from '../models/guidance.data';
import { GuidanceDataService } from '../services/guidance.data.service';
import { PipGuidanceService } from '../services/guidance.service';
import { GuidanceAction, PipGuidanceActionTypes } from './guidance.action';

export enum ApplicationsEntityState {
    View = 'view'
}

@Injectable()
export class PipGuidanceEffects {

    private guidances: Guidance[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private guidanceDataService: GuidanceDataService,
        private applicationDataService: IqsApplicationsDataService,
        private FilesService: PipFileUploadService
    ) { }

    @Effect() applications$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromGuidanceActions.PipGuidanceActionTypes.Applications),
            switchMap((action: any) => {
                if (action.type = PipGuidanceActionTypes.Applications) {
                    const payload = (<any>action).payload;
                    return this.applicationDataService.readApplications()
                        .pipe(
                            map(data => {
                                return new fromGuidanceActions.ApplicationSucessAction(<any[]>data);
                            }),
                            catchError(error => of(new fromGuidanceActions.ApplicationFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidance$: Observable<Action> = this.actions$
        .pipe(
            ofType(
                fromGuidanceActions.PipGuidanceActionTypes.Guidances,
                fromGuidanceActions.PipGuidanceActionTypes.GuidanceAbort
            ),
            switchMap((action: any) => {
                if (action.type = PipGuidanceActionTypes.Guidances) {
                    const payload = (<any>action).payload;
                    return this.guidanceDataService.guidances()
                        .pipe(
                            map(data => {
                                return new fromGuidanceActions.GuidanceSucessAction(data);
                            }),
                            catchError(error => of(new fromGuidanceActions.GuidanceFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidanceSuccess$ = this.actions$
        .pipe(
            ofType(fromGuidanceActions.PipGuidanceActionTypes.GuidanceSuccess),
            map((action: any) => (<any>action).payload),
            map(payload => {
                const saveState = this.activatedRoute.snapshot.queryParams['state'];
                if (payload && payload.length > 0) {

                    let index: number = findIndex(payload, { id: this.activatedRoute.snapshot.queryParams['guidance_id'] });
                    index = index > -1 ? index : 0;
                    if (!saveState || saveState === ApplicationsEntityState.View) {
                        return new fromGuidanceActions.GuidanceDataAction({ state: ApplicationsEntityState.View, id: payload[index].id });
                    }

                    return new fromGuidanceActions.GuidanceDataAction({ state: saveState, id: payload[index].id });
                }
                return new fromGuidanceActions.GuidanceEmptyAction();
            })
        );

    @Effect() guidanceData$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceData),
            map((action: any) => (<any>action).payload),
            map(payload => {
                return new fromGuidanceActions.GuidanceSelectAction(payload.id);
            })
        );

    @Effect({ dispatch: false }) guidanceSelect$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceSelect),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );

    @Effect({ dispatch: false }) guidanceChangeState$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceChangeState),
            tap(action => {
                const actionWithPayload = <any>action;
            })
        );

    @Effect() guidanceSaveImages$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromGuidanceActions.PipGuidanceActionTypes.GuidanceSaveImages),
            switchMap((action: any) => {
                if (action.type = fromGuidanceActions.PipGuidanceActionTypes.GuidanceSaveImages) {
                    const payload = (<any>action).payload;
                    const url = this.guidanceDataService.serverUrl;
                    console.log(payload);
                    const pages: any[] = pictureCreate(payload.guidance.pages);
                    return this.FilesService.uploadFiles(url + '/api/v1/blobs', pages)
                        .pipe(
                            map(data => {
                                payload.guidance = pictureCreated(url + '/api/v1/blobs/', payload.guidance, data.ids);
                                if (payload.state === PipGuidanceActionTypes.GuidanceCreate) {
                                    return new fromGuidanceActions.GuidanceCreateAction(payload.guidance);
                                }

                                return new fromGuidanceActions.GuidanceUpdatesAction(payload.guidance);
                            }),
                            catchError(error => of(new fromGuidanceActions.GuidanceUpdatesFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidanceUpdate$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceUpdate),
            switchMap((action: any) => {
                if (action.type = PipGuidanceActionTypes.GuidanceUpdate) {
                    const payload = (<any>action).payload;

                    return this.guidanceDataService.guidanceUpdate(payload)
                        .pipe(
                            map(data => {

                                return new fromGuidanceActions.GuidanceUpdatesSuccessAction(data);
                            }),
                            catchError(error => of(new fromGuidanceActions.GuidanceUpdatesFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidanceCreate$: Observable<Action> = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceCreate),
            switchMap((action: any) => {
                if (action.type = PipGuidanceActionTypes.GuidanceCreate) {
                    const payload = (<any>action).payload;
                    return this.guidanceDataService.guidanceCreate(payload)
                        .pipe(
                            map(data => {

                                return new fromGuidanceActions.GuidanceCreateSuccessAction(data);
                            }),
                            catchError(error => of(new fromGuidanceActions.GuidanceCreateFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidanceCreateSuccess$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceCreateSuccess),
            map((action: any) => action.payload),
            map(payload => {
                const guidanceId = payload ? payload.id : null;
                return new fromGuidanceActions.GuidanceSelectAction(guidanceId);
            })
        );

    @Effect() guidanceDelete$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceDelete),
            switchMap((action: any) => {
                if (action.type = PipGuidanceActionTypes.GuidanceDelete) {
                    const payload = (<any>action).payload;
                    return this.guidanceDataService.guidanceDelete(payload)
                        .pipe(
                            map(data => {

                                return new fromGuidanceActions.GuidanceDeleteSuccessAction(data);
                            }),
                            catchError(error => of(new fromGuidanceActions.GuidanceDeleteFailureAction(error)))
                        );
                } else {
                    return of();
                }
            })
        );

    @Effect() guidanceDeleteSuccess$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceDeleteSuccess),
            map((action: any) => action.payload),
            map(payload => {
                return new fromGuidanceActions.GuidanceSelectAction(null);
            })
        );

    @Effect({ dispatch: false }) guidanceChangeCancel$ = this.actions$
        .pipe(
            ofType(PipGuidanceActionTypes.GuidanceChangeCancel),
            map((action: any) => action.payload),
            map(payload => {
                return new fromGuidanceActions.GuidanceChangeCancelAction(payload.guidances);
            })
        );
}

function pictureCreate(pages: GuidePage[]) {
    const collection: any[] = [];
    pages.forEach(element => {
        if (element['dataPic']) {
            collection.push(
                {
                    filename: element['dataPic'] ? element['dataPic'].name || element.title.en : element.title.en,
                    file: element['dataPic'] && element['dataPic'].url ? dataURItoBlob(element['dataPic'].url) : null
                }
            );
        }

    });

    return collection;
}

function pictureCreated(url: string, guidance: Guidance, collectionIds: string[]) {
    let i = 0;
    guidance.pages.forEach((element, index) => {

        if (element['dataPic']) {
            guidance.pages[index].pic_id = collectionIds[i];
            guidance.pages[index].pic_url = url + collectionIds[i];
            delete guidance.pages[index]['dataPic'];
            i++;
        }
    });

    return guidance;
}
