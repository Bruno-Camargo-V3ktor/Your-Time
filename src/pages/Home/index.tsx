import { HandPalm, Play } from "phosphor-react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

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

const newCycleFormValidationSchema = zod.object( {
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos')
  } )
  
  //interface NewCycleFormData {
  //    task: string,
  //    minutesAmount: number
  //}
  
  type NewCycleFormData = zod.infer< typeof newCycleFormValidationSchema >

// *********************************************************** \\

interface CycleContextType {
    activeCycle: Cycle | undefined,
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void,
    setSecondsPassed: (seconds: number) => void,
}

export const CycleContext = createContext<CycleContextType>( {} as CycleContextType )

// *********************************************************** \\

export function Home(  ) {
    
    // States
    const newCycleForm = useForm< NewCycleFormData >( {
        resolver: zodResolver( newCycleFormValidationSchema ),
        defaultValues: { task: '', minutesAmount: 0 }
      } );
    const { handleSubmit, watch, reset } = newCycleForm
    
    const [cycles, setCycles] = useState<Cycle[]>( [] )
    const [activeCycleId, setActiveCycleId] = useState<number | null>( null )
    const [amountSecondsPassed, setAmountSecondsPassed] = useState( 0 )

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

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed( seconds );
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
    
        const newCycle: typeof activeCycle = {
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

        setAmountSecondsPassed( 0 )
        setActiveCycleId(null)
    }

    // Effects

    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="" onSubmit={ handleSubmit( handleCreateNewCycle ) }>

                <CycleContext.Provider value={ {activeCycle, amountSecondsPassed, markCurrentCycleAsFinished, setSecondsPassed} }>

                    <FormProvider {...newCycleForm} >
                        <CycleForm />
                    </FormProvider>
                    
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