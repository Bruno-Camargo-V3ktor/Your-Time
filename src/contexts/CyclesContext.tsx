import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptActiveCycleAction, markCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface NewCycleFormData {
    task: string,
    minutesAmount: number
}

interface CycleContextType {
    activeCycle: Cycle | undefined,
    cycles: Cycle[],
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
    createNewCycle: (cycle: NewCycleFormData) => void,
    interruptActiveCycle: () => void
}

interface CycleContextProps {
    children: ReactNode
}

// *********************************************************** \\

export const CyclesContext = createContext( {} as CycleContextType )

export function CyclesContextProvider( { children }: CycleContextProps ) {
    
    // States
    //const [cycles, setCycles] = useState<Cycle[]>( [] )
    //const [activeCycleId, setActiveCycleId] = useState<number | null>( null )

    const [cyclesState, dispatch] = useReducer( 
        cyclesReducer, 
        {cycles: [], activeCycleId: null},
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@your-timer:cycles-state-1.0.0')

            if( storedStateAsJSON ) {
                return JSON.parse( storedStateAsJSON )
            }

            return initialState
        }
    )

    // Atributos
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState( () => {
        if( activeCycle ) { return differenceInSeconds( new Date(), activeCycle.startDate ) }
        return 0
    } )

    // Métodos
    function markCurrentCycleAsFinished() {
        //setCycles( value => value.map( cycle => {
        //    if( cycle.id == activeCycle!.id ) return { ...cycle, finishedDate: new Date() }
        //    else return cycle
        //}) )

        dispatch( markCycleAsFinishedAction() )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed( seconds );
    }

    function createNewCycle(data: NewCycleFormData) {
        //console.log(data);
    
        const newCycle: typeof activeCycle = {
            id: new Date().getTime(),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
        
        dispatch( addNewCycleAction( newCycle ) )

        //setCycles( value => [...value, newCycle] )
        //setActiveCycleId( newCycle.id )
    }

    function interruptActiveCycle() {
        //setCycles( (value) => value.map( cycle => { 
        //    if( cycle.id === activeCycleId ) return { ...cycle, interruptDate: new Date() }
        //    else return cycle
        // }) 
        //)

        dispatch( interruptActiveCycleAction() )

        setAmountSecondsPassed( 0 )
    }

    // Effects
    useEffect( () => {
        const stateJSON = JSON.stringify( cyclesState )
        localStorage.setItem('@your-timer:cycles-state-1.0.0', stateJSON)
    },[cyclesState] )

    // Render
    return (
        <CyclesContext.Provider value={ {
            activeCycle,
            cycles,
            amountSecondsPassed,
            setSecondsPassed,
            markCurrentCycleAsFinished,
            createNewCycle,
            interruptActiveCycle
        } } >

            {children}
        </CyclesContext.Provider>
    )

}