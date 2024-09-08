
import { useEffect, useState } from "react";
import { CountContainer, SeparatorContainer } from "./styles";
import { differenceInSeconds } from "date-fns";

export function Countdown() {
    
    // States
    const [amountSecondsPassed, setAmountSecondsPassed] = useState( 0 )

    // Atributos
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    
    // Effetcs
    useEffect( () => 
        {  
            let countdownIntervalId: number;
    
            if( activeCycle && !activeCycle.finishedDate ) {
    
                countdownIntervalId = setInterval(() => {
    
                    const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
                    if( secondsDifference >= totalSeconds ) {
                        
                        setCycles( value => value.map( cycle => {
                            if( cycle.id == activeCycle.id ) return { ...cycle, finishedDate: new Date() }
                            else return cycle
                        }) )
    
                        setAmountSecondsPassed( () => totalSeconds );
                        clearInterval( countdownIntervalId );
                    }
                    else { setAmountSecondsPassed( secondsDifference )  }
    
                }, 1000);
            }
    
            return () => { clearInterval( countdownIntervalId ); }
    
        }, [activeCycle, totalSeconds] )

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