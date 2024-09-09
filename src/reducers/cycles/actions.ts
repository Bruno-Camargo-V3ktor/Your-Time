import { Cycle } from "./reducer";


export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
    MARK_CYCLE_AS_FINISHED = 'MARK_CYCLE_AS_FINISHED'
}


// ************************************************************** \\

export function addNewCycleAction( newCycle: Cycle ) {
    return {
        type: ActionTypes.ADD_NEW_CYCLE,
        payload: { data: newCycle }
    }
}

export function interruptActiveCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_ACTIVE_CYCLE
    }
}

export function markCycleAsFinishedAction() {
    return {
        type: ActionTypes.MARK_CYCLE_AS_FINISHED
    }
}