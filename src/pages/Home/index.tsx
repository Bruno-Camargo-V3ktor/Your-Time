import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";

import { CountContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartButton, StopButton, TaskInput } from "./styles";
import { useEffect, useState } from "react";

const newCycleFormValidationSchema = zod.object( {
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos')
} )

//interface NewCycleFormData {
//    task: string,
//    minutesAmount: number
//}

type NewCycleFormData = zod.infer< typeof newCycleFormValidationSchema >

interface Cycle {
    id: number,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptDate?: Date
}

// *********************************************************** \\

export function Home(  ) {
    
    // States
    const [cycles, setCycles] = useState<Cycle[]>( [] )
    const [activeCycleId, setActiveCycleId] = useState<number | null>( null )
    const [amountSecondsPassed, setAmountSecondsPassed] = useState( 0 )

    const { register, handleSubmit, watch, reset, formState } = useForm< NewCycleFormData >( {
        resolver: zodResolver( newCycleFormValidationSchema ),
        defaultValues: { task: '', minutesAmount: 0 }
    } );

    // Atributos
    const activeCycle = cycles.find( (value) => value.id === activeCycleId )

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds-amountSecondsPassed : 0
    const minutesAmount = Math.floor( currentSeconds / 60 )
    const secondsAmount = currentSeconds - ( minutesAmount * 60 ) // currentSeconds % 60
    const minutes = String( minutesAmount ).padStart(2, '0');
    const seconds = String( secondsAmount ).padStart(2, '0');

    const task = watch("task");
    const isSubmitDisable = !task;

    //console.log( formState.errors );
    //console.log( activeCycle )

    // Métodos
    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);

        const newCycle: Cycle = {
            id: new Date().getTime(),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles( value => [...value, newCycle] )
        setActiveCycleId( newCycle.id )

        reset();
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
    useEffect( () =>
    {
        if( activeCycle ) {
            document.title = `Your Time (${minutes}:${seconds})`
        }
    }, [activeCycle, minutes, seconds])

    useEffect( () => 
    {
        let countdownIntervalId: number;

        if( activeCycle ) {
            countdownIntervalId = setInterval(() => { 
                setAmountSecondsPassed( differenceInSeconds(new Date(), activeCycle.startDate) ) 
            }, 1000);
        }

        return () => { clearInterval( countdownIntervalId ); setAmountSecondsPassed(0) }

    }, [activeCycle] )

    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="" onSubmit={ handleSubmit( handleCreateNewCycle ) }>

                <FormContainer>
                    <label htmlFor='task'>Vou trabalhar em</label>
                    <TaskInput 
                      id='task' 
                      type="text" 
                      placeholder="Dê um nome para o seu projeto" 
                      list="task-suggestions"

                      disabled={ !!activeCycle }
                      { ...register('task') }
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto #01" />
                        <option value="Projeto #02" />
                        <option value="Projeto #03" />
                    </datalist>

                    <label htmlFor='minutesAmount'>durante</label>
                    <MinutesAmountInput 
                      id='minutesAmount' 
                      type="number" 
                      placeholder="00" 
                      step={5}
                      min={5}
                      max={60}
                      
                      disabled={ !!activeCycle }
                      { ...register('minutesAmount', {valueAsNumber: true}) }
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountContainer>

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