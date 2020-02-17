import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Application } from 'iqs-libs-clientshell2-angular';

import { Guidance } from '../../guides/models/guidance.data';

export class PipGuidanceState {
    public guidances: Guidance[];
    public loading: boolean;
    public updateState: string;
    public error: any;
    public selectId: string;
    public urlState: any;
    public isSingle: boolean;
    public applications: Application[];
}

export const getGuidancesStoreState = createFeatureSelector<PipGuidanceState>('guidance');

export const getGuidanceGuidances = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.guidances);
export const getGuidanceLoading = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.loading);
export const getGuidanceUpdateState = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.updateState);
export const getGuidanceError = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.error);
export const getGuidanceSelectedId = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.selectId);
export const getGuidanceUrlState = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.urlState);
export const getGuidanceIsSingle = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.isSingle);
export const getGuidanceApplications = createSelector(getGuidancesStoreState, (state: PipGuidanceState) => state.applications);



// export const InitialPipGuidanceState: PipGuidanceState = {
//     guidances: [],
//     selectId: null,
//     updateState: null,
//     loading: null,
//     error: null,
//     isSingle: false,
//     urlState: {},
//     applications: []
// };

// export class PipGuidanceActionTypes {
//     static Guidances = '[Content] Guidance';
//     static GuidanceAbort = '[Content] Guidance Abort';
//     static GuidanceSuccess = '[Content] Guidance Success';
//     static GuidanceEmpty = '[Content] Guidance Empty';
//     static GuidanceData = '[Content] Guidance Data';
//     static GuidanceFailure = '[Content] Guidance Failure';
//     static GuidanceSelect = '[Content] Guidance Select';
//     static GuidanceChangeState = '[Content] Guidance Change state';
//     static GuidanceSaveImages = '[Content] Guidance SaveImages';
//     static GuidanceCreate = '[Content] Guidance Create';
//     static GuidanceCreateSuccess = '[Content] Guidance Create Success';
//     static GuidanceCreateFailure = '[Content] Guidance Create Failure';
//     static GuidanceChangeCancel = '[Content] Guidance Edit/Create/Delete Cancel';
//     static GuidanceUpdate = '[Content] Guidance Update';
//     static GuidanceUpdateSuccess = '[Content] Guidance Update Success';
//     static GuidanceUpdateFailure = '[Content] Guidance Update Failure';
//     static GuidanceDelete = '[Content] Delete Guidance ';
//     static GuidanceDeleteSuccess = '[Content] Delete Guidance  Success';
//     static GuidanceDeleteFailure = '[Content] Delete Guidance Failure';

//     static Applications = '[Content] Applications';
//     static ApplicationSuccess = '[Content] Applications Success';
//     static ApplicationData = '[Content] Applications Data';
//     static ApplicationFailure = '[Content] Applications Failure';
// }

// @Injectable()
// export class GuidanceActions {
//     guidances(): Action {
//         return <Action>{
//             type: PipGuidanceActionTypes.Guidances
//         };
//     }

//     guidanceSuccess(guidances: Guidance[]): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceSuccess,
//             payload: guidances
//         };
//     }

//     guidanceEmpty(): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceEmpty
//         };
//     }

//     guidanceData(state: string, id: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceData,
//             payload: {
//                 state: state,
//                 id: id
//             }
//         };
//     }

//     guidanceFailure(error: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceFailure,
//             payload: error
//         };
//     }

//     guidanceSelect(id: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceSelect,
//             payload: id
//         };
//     }

//     guidanceChangeState(state: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceChangeState,
//             payload: state
//         };
//     }

//     guidanceSaveImages(guidance: Guidance, state: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceSaveImages,
//             payload: {
//                 guidance: guidance,
//                 state: state
//             }
//         };
//     }

//     guidanceCreate(guidance: Guidance): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceCreate,
//             payload: guidance
//         };
//     }

//     guidanceCreateSuccess(createGuidance: Guidance): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceCreateSuccess,
//             payload: createGuidance
//         };
//     }

//     guidanceCreateFailure(error: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceCreateFailure,
//             payload: error
//         };
//     }

//     guidanceUpdate(guidance: Guidance): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceUpdate,
//             payload: guidance
//         };
//     }

//     guidanceUpdateSuccess(update: Guidance): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceUpdateSuccess,
//             payload: update
//         };
//     }

//     guidanceUpdateFailure(error: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceUpdateFailure,
//             payload: error
//         };
//     }

//     guidanceChangeCancel(guidances: Guidance[]): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceChangeCancel,
//             payload: guidances
//         };
//     }

//     guidanceDelete(id: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceDelete,
//             payload: id
//         };
//     }


//     guidanceDeleteSuccess(id: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceDeleteSuccess,
//             payload: id
//         };
//     }

//     guidanceDeleteFailure(error: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.GuidanceDeleteFailure,
//             payload: error
//         };
//     }

//     applications(): Action {
//         return <Action>{
//             type: PipGuidanceActionTypes.Applications
//         };
//     }

//     applicationSuccess(apps: Application[]): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.ApplicationSuccess,
//             payload: apps
//         };
//     }

//     applicationFailure(error: string): Action {
//         return <any>{
//             type: PipGuidanceActionTypes.ApplicationFailure,
//             payload: error
//         };
//     }
// }
