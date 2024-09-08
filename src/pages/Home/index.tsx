import { HandPalm, Play } from "phosphor-react";

import { HomeContainer, StartButton, StopButton } from "./styles";
import { useEffect, useState } from "react";
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

export function Home(  ) {
    
    // States
    const [cycles, setCycles] = useState<Cycle[]>( [] )
    const [activeCycleId, setActiveCycleId] = useState<number | null>( null )

    // Atributos
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor( currentSeconds / 60 )
    const secondsAmount = currentSeconds - ( minutesAmount * 60 ) // currentSeconds % 60
    const minutes = String( minutesAmount ).padStart(2, '0');
    const seconds = String( secondsAmount ).padStart(2, '0');

    const task = watch("task");
    const isSubmitDisable = !task;

    //console.log( formState.errors );
    //console.log( activeCycle )

    // Métodos
    function handleInterruptActiveCycle() {
        setCycles( (value) => value.map( cycle => { 
            if( cycle.id === activeCycleId ) return { ...cycle, interruptDate: new Date() }
            else return cycle
         }) 
        )

        setAmountSecondsPassed( 0 );
        setActiveCycleId(null);
    }

    // Effects
    useEffect( () =>
    {
        if( activeCycle ) { document.title = `Your Time (${minutes}:${seconds})` }
        else document.title = `Your Time`
    }, [activeCycle, minutes, seconds])

    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="" onSubmit={ handleSubmit( handleCreateNewCycle ) }>

                <CycleForm />

                <Countdown />

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