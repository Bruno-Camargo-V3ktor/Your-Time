import { HandPalm, Play } from "phosphor-react";

import { HomeContainer, StartButton, StopButton } from "./styles";
import { createContext, useState } from "react";
import { Countdown } from "./components/Countdown/indext";
import { CycleForm } from "./components/CycleForm/indext";

interface Cycle {
    id: number,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date,
    finishedDate?: Date
}

// *********************************************************** \\

interface CycleContextType {
    activeCycle: Cycle | undefined,
    markCurrentCycleAsFinished: () => void,
}

export const CycleContext = createContext<CycleContextType>( {} as CycleContextType )

// *********************************************************** \\

export function Home(  ) {
    
    // States
    const [cycles, setCycles] = useState<Cycle[]>( [] )
    const [activeCycleId, setActiveCycleId] = useState<number | null>( null )

    // Atributos
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    const task = watch("task");
    const isSubmitDisable = !task;

    //console.log( formState.errors );
    //console.log( activeCycle )

    // Métodos
    function markCurrentCycleAsFinished() {
        setCycles( value => value.map( cycle => {
            if( cycle.id == activeCycle!.id ) return { ...cycle, finishedDate: new Date() }
            else return cycle
        }) )
    }

    function handleInterruptActiveCycle() {
        setCycles( (value) => value.map( cycle => { 
            if( cycle.id === activeCycleId ) return { ...cycle, interruptDate: new Date() }
            else return cycle
         }) 
        )

        setActiveCycleId(null);
    }

    // Effects

    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="" onSubmit={ handleSubmit( handleCreateNewCycle ) }>

                <CycleContext.Provider value={ {activeCycle, markCurrentCycleAsFinished} }>
                    <CycleForm />
                    <Countdown />
                </CycleContext.Provider>

                { activeCycle 
                    ? (<StopButton type='button' onClick={ handleInterruptActiveCycle }>
                            <HandPalm size={24}/>
                            Interromper
                        </StopButton >
                      )

                    : (<StartButton disabled={ isSubmitDisable } type='submit'>
                            <Play size={24}/>
                            Começar
                        </StartButton >
                      )

                }

            </form>
        </HomeContainer>
    )

}