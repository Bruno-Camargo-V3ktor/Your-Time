import { ActionTypes } from "./actions";
import { produce } from "immer";

export interface Cycle {
    id: number,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

interface CycleState {
    cycles: Cycle[],
    activeCycleId: number | null
}

// ************************************************************** \\

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer( state: CycleState, action: any ) {
    console.log( state );
    console.log( action );

    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE: {
            //return {
            //    ...state,
            //    cycles: [ ...state.cycles, action.payload.data ],
            //    activeCycleId: action.payload.data.id
            //}

            return produce( state, draft => {
                draft.cycles.push( action.payload.data )
                draft.activeCycleId = action.payload.data.id
            } )
        }
        
        case ActionTypes.INTERRUPT_ACTIVE_CYCLE: {
            //return {
            //    ...state,
            //    cycles: state.cycles.map( (cycle) => {
            //        if( cycle.id === state.activeCycleId ) return { ...cycle, interruptDate: new Date() }
            //        else return cycle
            //    } ),
            //    activeCycleId: null
            //}

            const currentCycleIndex = state.cycles.findIndex( cycle => cycle.id === state.activeCycleId )
            if( currentCycleIndex < 0 ) return state

            return produce( state, draft => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptDate = new Date()
            } )
        }
        
            case ActionTypes.MARK_CYCLE_AS_FINISHED: {
                //return {
                //    ...state,
                //    cycles: state.cycles.map( (cycle) => {
                //        if( cycle.id === state.activeCycleId ) return { ...cycle, finishedDate: new Date() }
                //        else return cycle
                //    } ),
                //    activeCycleId: null
                //}

                const currentCycleIndex = state.cycles.findIndex( cycle => cycle.id === state.activeCycleId )
                if( currentCycleIndex < 0 ) return state;
                
                return produce( state, draft => {
                    draft.activeCycleId = null;
                    draft.cycles[currentCycleIndex].finishedDate = new Date();
                } )
            }

        default:
            return state;
    }
}
