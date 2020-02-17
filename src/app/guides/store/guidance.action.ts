import { Action } from '@ngrx/store';

export enum PipGuidanceActionTypes {
    Guidances = '[Content] Guidance',
    GuidanceAbort = '[Content] Guidance Abort',
    GuidanceSuccess = '[Content] Guidance Success',
    GuidanceEmpty = '[Content] Guidance Empty',
    GuidanceData = '[Content] Guidance Data',
    GuidanceFailure = '[Content] Guidance Failure',
    GuidanceSelect = '[Content] Guidance Select',
    GuidanceChangeState = '[Content] Guidance Change state',
    GuidanceSaveImages = '[Content] Guidance SaveImages',
    GuidanceCreate = '[Content] Guidance Create',
    GuidanceCreateSuccess = '[Content] Guidance Create Success',
    GuidanceCreateFailure = '[Content] Guidance Create Failure',
    GuidanceChangeCancel = '[Content] Guidance Edit/Create/Delete Cancel',
    GuidanceUpdate = '[Content] Guidance Update',
    GuidanceUpdateSuccess = '[Content] Guidance Update Success',
    GuidanceUpdateFailure = '[Content] Guidance Update Failure',
    GuidanceDelete = '[Content] Delete Guidance ',
    GuidanceDeleteSuccess = '[Content] Delete Guidance  Success',
    GuidanceDeleteFailure = '[Content] Delete Guidance Failure',

    Applications = '[Content] Applications',
    ApplicationSuccess = '[Content] Applications Success',
    ApplicationData = '[Content] Applications Data',
    ApplicationFailure = '[Content] Applications Failure'
}


export class GuidancesAction implements Action {
    readonly type = PipGuidanceActionTypes.Guidances;

    constructor() { }
}

export class GuidanceAbortAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceAbort;

    constructor(public payload: any) { }
}

export class GuidanceEmptyAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceEmpty;

    constructor() { }
}

export class GuidanceDataAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceData;

    constructor(public payload: any) { }
}

export class GuidanceSucessAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceSuccess;

    constructor(public payload: any) { }
}

export class GuidanceFailureAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceFailure;

    constructor(public payload: any) { }
}

export class GuidanceSelectAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceSelect;

    constructor(public payload: any) { }
}

export class GuidanceSaveImagesAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceSaveImages;

    constructor(public payload: any) { }
}


export class GuidanceChangeStateAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceChangeState;

    constructor(public payload: any) { }
}

export class GuidanceCreateAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceCreate;

    constructor(public payload: any) { }
}

export class GuidanceCreateSuccessAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceCreateSuccess;

    constructor(public payload: any) { }
}

export class GuidanceCreateFailureAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceCreateFailure;

    constructor(public payload: any) { }
}

export class GuidanceUpdatesAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceUpdate;

    constructor(public payload: any) { }
}

export class GuidanceUpdatesSuccessAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceUpdateSuccess;

    constructor(public payload: any) { }
}

export class GuidanceUpdatesFailureAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceUpdateFailure;

    constructor(public payload: any) { }
}

export class GuidanceChangeCancelAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceChangeCancel;

    constructor(public payload: any) { }
}

export class GuidanceDeleteAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceDelete;

    constructor(public payload: any) { }
}

export class GuidanceDeleteSuccessAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceDeleteSuccess;

    constructor(public payload: any) { }
}

export class GuidanceDeleteFailureAction implements Action {
    readonly type = PipGuidanceActionTypes.GuidanceDeleteFailure;

    constructor(public payload: any) { }
}

export class ApplicationsAction implements Action {
    readonly type = PipGuidanceActionTypes.Applications;

    constructor() { }
}

export class ApplicationDataAction implements Action {
    readonly type = PipGuidanceActionTypes.ApplicationData;

    constructor(public payload: any) { }
}

export class ApplicationSucessAction implements Action {
    readonly type = PipGuidanceActionTypes.ApplicationSuccess;

    constructor(public payload: any) { }
}

export class ApplicationFailureAction implements Action {
    readonly type = PipGuidanceActionTypes.ApplicationFailure;

    constructor(public payload: any) { }
}


export type GuidanceAction = GuidancesAction
    | GuidanceAbortAction
    | GuidanceEmptyAction
    | GuidanceDataAction
    | GuidanceSucessAction
    | GuidanceFailureAction
    | GuidanceSelectAction
    | GuidanceSaveImagesAction
    | GuidanceChangeStateAction
    | GuidanceCreateAction
    | GuidanceCreateSuccessAction
    | GuidanceCreateFailureAction
    | GuidanceUpdatesAction
    | GuidanceUpdatesSuccessAction
    | GuidanceUpdatesFailureAction
    | GuidanceChangeCancelAction
    | GuidanceDeleteAction
    | GuidanceDeleteSuccessAction
    | GuidanceDeleteFailureAction
    | ApplicationsAction
    | ApplicationDataAction
    | ApplicationSucessAction
    | ApplicationFailureAction;








