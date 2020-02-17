import { fromJS } from 'immutable';
import { cloneDeep, filter, findIndex, union } from 'lodash';

import { PipUpdateState } from '../../guides/models/guidance.data';
import { PipGuidanceState } from './guidance.state';
import { PipGuidanceActionTypes, GuidanceAction } from './guidance.action';

export const InitialPipGuidanceState: PipGuidanceState = {
    guidances: [],
    selectId: null,
    updateState: null,
    loading: null,
    error: null,
    isSingle: false,
    urlState: {},
    applications: []
};

export function pipGuidanceReducer(state = InitialPipGuidanceState, action: GuidanceAction): PipGuidanceState {
    let map;
    switch (action.type) {

        case PipGuidanceActionTypes.Guidances:
            map = fromJS(state);
            map = map.set('guidances', []);
            map = map.set('error', null);
            map = map.set('loading', true);
            map = map.set('updateState', PipUpdateState.Progress);
            return map.toJS();

        case PipGuidanceActionTypes.GuidanceAbort:
        let updateState = state.guidances && state.guidances.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;
  
        return { ...state, updateState: updateState, loading: false, error: null };


        case PipGuidanceActionTypes.GuidanceSuccess:
            map = fromJS(state);
            let guidanceSuccess = action.payload;
            if (!guidanceSuccess) {
                guidanceSuccess = [];
            }            
            map = map.set('guidances', guidanceSuccess);
            map = map.set('error', null);
            map = map.set('loading', false);
            return map.toJS();

        case PipGuidanceActionTypes.GuidanceData:
        return { ...state, updateState:  action.payload.state };

        case PipGuidanceActionTypes.GuidanceEmpty:
        return { ...state, updateState: PipUpdateState.Empty, guidances: [], selectId: null };

        case PipGuidanceActionTypes.GuidanceFailure:
        return { ...state, error: action.payload, loading: false };

        case PipGuidanceActionTypes.GuidanceSelect:
            let id = null;
            const oldId = state.selectId;
            const collection = state.guidances;
            if (collection && collection.length > 0) {
                let index = findIndex(collection, (item) => item.id === action.payload);
                if (index === -1) {
                    const oldIndex = findIndex(collection, (item) => item.id === oldId);
                    if (oldIndex === -1) {
                        index = 0;
                    } else {
                        index = oldIndex < collection.length ? oldIndex : oldIndex - 1;
                    }

                    id = collection[index] ? collection[index].id : null;
                } else {
                    id = action.payload;
                }
            }
            let changes: any = { };
            if (state.selectId !== id) {
                changes.error = null;
            }
            changes.selectId = id;
            changes.updateState = (!state.guidances || state.guidances.length === 0) ? PipUpdateState.Empty : PipUpdateState.View

            return Object.assign({}, state, changes)

        case PipGuidanceActionTypes.GuidanceChangeState:
        return { ...state, updateState: action.payload, error: null };



        case PipGuidanceActionTypes.GuidanceSaveImages:
            // map = fromJS(state);
            // map = map.set('error', null);
            // map = map.set('loading', true);
            // return <PipGuidanceState>map.toJS();
            return { ...state, loading: true, error: null };

        case PipGuidanceActionTypes.GuidanceUpdate:
            return { ...state, loading: true, error: null };

        case PipGuidanceActionTypes.GuidanceUpdateSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const updateIndex = findIndex(state.guidances, { id: action.payload.id }),
                updateGuidances = state.guidances;
            updateGuidances[updateIndex] = action.payload;
            map = map.set('guidances', updateGuidances);
            return map.toJS();

        case PipGuidanceActionTypes.GuidanceUpdateFailure:
        return { ...state, loading: false, error: action.payload };

        case PipGuidanceActionTypes.GuidanceCreate:
        return { ...state, loading: true, error: null };

        case PipGuidanceActionTypes.GuidanceCreateSuccess:
            map = fromJS(state);
            map = map.set('updateState', PipUpdateState.View);
            map = map.set('error', null);
            map = map.set('loading', false);
            const createGuidances = state.guidances;
            createGuidances.push(action.payload);
            map = map.set('guidances', createGuidances);
            return map.toJS();

        case PipGuidanceActionTypes.GuidanceCreateFailure:
        return { ...state, loading: false, error: action.payload };

        case PipGuidanceActionTypes.GuidanceChangeCancel:
        const stateAfterCancel = state.guidances && state.guidances.length > 0 ? PipUpdateState.View : PipUpdateState.Empty;
        return {
            ...state,
            updateState: stateAfterCancel,
            error: null,
            loading: false
        };


        case PipGuidanceActionTypes.GuidanceDelete:
        return { ...state, loading: true, error: null };

        case PipGuidanceActionTypes.GuidanceDeleteSuccess:
            map = fromJS(state);
            map = map.set('error', null);
            map = map.set('loading', false);
            const guidances = filter(cloneDeep(state.guidances), element => element.id !== action.payload);
            map = map.set('guidances', guidances);
            map = map.set('updateState', guidances && guidances.length > 0 ? PipUpdateState.View : PipUpdateState.Empty);
            return <PipGuidanceState>map.toJS();

        case PipGuidanceActionTypes.GuidanceDeleteFailure:
        return { ...state, loading: false, error: action.payload };

        case PipGuidanceActionTypes.Applications:
            map = fromJS(state);
            map = map.set('applications', []);
            return map.toJS();

        case PipGuidanceActionTypes.ApplicationSuccess:
            map = fromJS(state);
            let appsSuccess = action.payload;
            if (!appsSuccess) {
                appsSuccess = [];
            }
            map = map.set('applications', appsSuccess);
            return map.toJS();

        case PipGuidanceActionTypes.ApplicationFailure:
            map = fromJS(state);
            map = map.set('applications', state.applications ? state.applications : []);
            return map.toJS();

        default:
            return state;
    }
}
