
import { useContext, useEffect } from "react";
import { CountContainer, SeparatorContainer } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CycleContext } from "../..";

export function Countdown() {
    
    // States

    // Atributos
    const { 
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed
     } = useContext( CycleContext )
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    const minutesAmount = Math.floor( currentSeconds / 60 )
    const secondsAmount = currentSeconds - ( minutesAmount * 60 ) // currentSeconds % 60
    const minutes = String( minutesAmount ).padStart(2, '0');
    const seconds = String( secondsAmount ).padStart(2, '0');

    // Effetcs
    useEffect( () =>
    {
        if( activeCycle ) { document.title = `Your Time (${minutes}:${seconds})` }
        else document.title = `Your Time`
    }, [activeCycle, minutes, seconds])

    useEffect( () => 
        {  
            let countdownIntervalId: number;
    
            if( activeCycle && !activeCycle.finishedDate ) {
    
                countdownIntervalId = setInterval(() => {
    
                    const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                    if( secondsDifference >= totalSeconds ) {
                        markCurrentCycleAsFinished()
                        
                        setSecondsPassed( totalSeconds );
                        clearInterval( countdownIntervalId );
                    }
                    else { setSecondsPassed( secondsDifference )  }
    
                }, 1000);
            }
            
            return () => { clearInterval( countdownIntervalId ); }
    
        }, [activeCycle, totalSeconds, markCurrentCycleAsFinished, setSecondsPassed] )

    // Render
    return (
        <CountContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <SeparatorContainer>:</SeparatorContainer>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountContainer>
    )

}