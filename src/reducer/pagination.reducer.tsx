/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as types from '../core/constants/action.types';
import { Action } from '../actions/pagination.action';

import * as appConfig from '../core/constants/app.constants';

import { IAtomPaginationArgs } from '../models/atom/atom.query';


/************************************/
/*            INTERFACES            */
/************************************/
export interface IPaginationState {
    paginationAtoms: IAtomPaginationArgs;
}

/************************************/
/*          DEFAULT STATE           */
/************************************/

const defaultState: IPaginationState = {
    paginationAtoms: {
        first: appConfig.ATOM_SEARCH_LIMIT,
        after: null,
        last: null,
        before: null
    }
};

// -----------------------------------


/** 
 * @desc This function takes Pagination actions and return a new state 
 * @param {IPaginationState} [state=defaultState] 
 * @param {Action} action 
 * @returns {IPaginationState} 
 */
export default function (state: IPaginationState = defaultState, action: Action): IPaginationState {

    switch (action.type) {

        /***********************************/
        /*       SEARCH ATOMS ACTIONS      */
        /***********************************/
        case types.LOCATION_CHANGE:
        case types.CLEAR_PAGINATION: {
            return {
                ...state,
                paginationAtoms: {
                    first: appConfig.ATOM_SEARCH_LIMIT,
                    after: null,
                    last: null,
                    before: null
                }
            };
        }

        case types.NEXT_PAGE_ATOMS: {
            return {
                ...state,
                paginationAtoms: {
                    first: action.paginationAtoms.first,
                    after: action.paginationAtoms.after,
                    last: null,
                    before: null
                } 
            };
        }

        case types.PREV_PAGE_ATOMS: {
            return {
                ...state,
                paginationAtoms: {
                    first: null,
                    after: null,
                    last: action.paginationAtoms.last,
                    before: action.paginationAtoms.before
                }  
            };
        }
            
        default:
            return state;  
    }
}
