import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Application } from 'iqs-libs-clientshell2-angular';
import { GuidanceDataService } from './guidance.data.service';
import { Guidance } from '../models/guidance.data';
import {
    GuidancesAction, ApplicationsAction, GuidanceSelectAction,
    GuidanceChangeStateAction, GuidanceCreateAction, GuidanceUpdatesAction, GuidanceSaveImagesAction,
    GuidanceDeleteAction, GuidanceChangeCancelAction
} from '../store/guidance.action';
import {
    getGuidanceError, getGuidanceLoading, getGuidanceUpdateState,
    getGuidanceGuidances, getGuidanceApplications, getGuidanceSelectedId, getGuidanceIsSingle
} from '../store';

@Injectable()
export class PipGuidanceService {

    constructor(
        private guidanceDataService: GuidanceDataService,
        private store: Store<any>
    ) { }


    public get error$(): Observable<string> {
        return this.store.select<any>(getGuidanceError);
    }

    public get loading$(): Observable<boolean> {
        return this.store.select<any>(getGuidanceLoading);
    }

    public get updateState$(): Observable<string> {
        return this.store.select<any>(getGuidanceUpdateState);
    }

    public get guidances$(): Observable<Guidance[]> {
        return this.store.select<any>(getGuidanceGuidances);
    }

    public get applications$(): Observable<Application[]> {
        return this.store.select<any>(getGuidanceApplications);
    }

    public get selectId$(): Observable<string> {
        return this.store.select<any>(getGuidanceSelectedId);
    }

    public get isSingle$(): Observable<boolean> {
        return this.store.select<any>(getGuidanceIsSingle);
    }


    public get selectGuidance$() {
        return this.store.select<any>((state) => {
            const id: string = state.guidance.selectId;
            const guidances = state.guidance.guidances;
            if (guidances && id) {
                for (const guidance of guidances) {
                    if (guidance.id === id) {
                        return guidance;
                    }
                }
            }
            return null;
        });
    }

    public guidance(): void {
        this.store.dispatch(new GuidancesAction());
    }

    public getApplications(): void {
        this.store.dispatch(new ApplicationsAction());
    }

    public guidanceSelect(id: string): void {
        this.store.dispatch(new GuidanceSelectAction(id));
    }

    public guidanceChangeState(state: string): void {
        this.store.dispatch(new GuidanceChangeStateAction(state));
    }

    public guidanceCreate(guidance: Guidance) {
        this.store.dispatch(new GuidanceCreateAction(guidance));
    }

    public guidanceUpdate(guidance: Guidance) {
        this.store.dispatch(new GuidanceUpdatesAction(guidance));
    }

    public guidanceSaveImages(guidance: Guidance, state: string) {
        this.store.dispatch(new GuidanceSaveImagesAction({ guidance: guidance, state: state }));
    }

    public guidanceDelete(id: string) {
        this.store.dispatch(new GuidanceDeleteAction(id));
    }

    public guidanceChangeCancel(guidances: Guidance[]) {
        this.store.dispatch(new GuidanceChangeCancelAction(guidances));
    }
}
