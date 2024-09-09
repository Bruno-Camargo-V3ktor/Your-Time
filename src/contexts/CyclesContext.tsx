import { createContext, ReactNode, useState } from "react";


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

// *********************************************************** \\

export const CyclesContext = createContext( {} as CycleContextType )

export function CyclesContextProvider( { children }: CycleContextProps ) {
    
    // States
    const [cycles, setCycles] = useState<Cycle[]>( [] )
    const [activeCycleId, setActiveCycleId] = useState<number | null>( null )
    const [amountSecondsPassed, setAmountSecondsPassed] = useState( 0 )

    // Atributos
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    // Métodos
    function markCurrentCycleAsFinished() {
        setCycles( value => value.map( cycle => {
            if( cycle.id == activeCycle!.id ) return { ...cycle, finishedDate: new Date() }
            else return cycle
        }) )
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed( seconds );
    }

    function createNewCycle(data: NewCycleFormData) {
        console.log(data);
    
        const newCycle: typeof activeCycle = {
            id: new Date().getTime(),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }
    
        setCycles( value => [...value, newCycle] )
        setActiveCycleId( newCycle.id )
    }

    function interruptActiveCycle() {
        setCycles( (value) => value.map( cycle => { 
            if( cycle.id === activeCycleId ) return { ...cycle, interruptDate: new Date() }
            else return cycle
         }) 
        )

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