import { createContext, ReactNode, useReducer, useState } from "react";


interface Cycle {
    id: number,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

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

interface CycleState {
    cycles: Cycle[],
    activeCycleId: number | undefined
}

// *********************************************************** \\

export const CyclesContext = createContext( {} as CycleContextType )

export function CyclesContextProvider( { children }: CycleContextProps ) {
    
    // States
    //const [cycles, setCycles] = useState<Cycle[]>( [] )
    //const [activeCycleId, setActiveCycleId] = useState<number | null>( null )

    const [cyclesState, dispatch] = useReducer( (state: CycleState, action: any) => {
        console.log( state );
        console.log( action );

        switch (action.type) {
            case "ADD_NEW_CYCLE":
                return {
                    ...state,
                    cycles: [ ...state.cycles, action.payload.data ],
                    activeCycleId: action.payload.data.id
                }
                break;
            
            case "INTERRUPT_ACTIVE_CYCLE":
                return {
                    ...state,
                    cycles: state.cycles.map( (cycle) => {
                        if( cycle.id === state.activeCycleId ) return { ...cycle, interruptDate: new Date() }
                        else return cycle
                    } ),
                    activeCycleId: null
                }

                break;
            
                case "MARK_CYCLE_AS_FINISHED":
                    return {
                        ...state,
                        cycles: state.cycles.map( (cycle) => {
                            if( cycle.id === state.activeCycleId ) return { ...cycle, finishedDate: new Date() }
                            else return cycle
                        } ),
                        activeCycleId: null
                    }
    
                    break;

            default:
                return state;
        }
        
    }, {cycles: [], activeCycleId: null} )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState( 0 )

    // Atributos
    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    // Métodos
    function markCurrentCycleAsFinished() {
        //setCycles( value => value.map( cycle => {
        //    if( cycle.id == activeCycle!.id ) return { ...cycle, finishedDate: new Date() }
        //    else return cycle
        //}) )

        dispatch( {
            type: "MARK_CYCLE_AS_FINISHED",
            payload: { data: activeCycle }
        } )
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
        
        dispatch( {
            type: "ADD_NEW_CYCLE",
            payload: { data: newCycle }
        } )

        //setCycles( value => [...value, newCycle] )
        //setActiveCycleId( newCycle.id )
    }

    function interruptActiveCycle() {
        //setCycles( (value) => value.map( cycle => { 
        //    if( cycle.id === activeCycleId ) return { ...cycle, interruptDate: new Date() }
        //    else return cycle
        // }) 
        //)

        dispatch( {
            type: "INTERRUPT_ACTIVE_CYCLE",
            payload: { data: activeCycle }
        } )

        setAmountSecondsPassed( 0 )
        setActiveCycleId( null )
    }

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