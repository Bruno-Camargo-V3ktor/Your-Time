import { HandPalm, Play } from "phosphor-react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import { HomeContainer, StartButton, StopButton } from "./styles";
import { Countdown } from "./components/Countdown/indext";
import { CycleForm } from "./components/CycleForm/indext";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

// *********************************************************** \\

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

export function Home(  ) {
    
    // States
    const newCycleForm = useForm< NewCycleFormData >( {
        resolver: zodResolver( newCycleFormValidationSchema ),
        defaultValues: { task: '', minutesAmount: 0 }
      } );
    const { handleSubmit, watch, reset } = newCycleForm

    // Atributos
    const { activeCycle, createNewCycle, interruptActiveCycle } = useContext( CyclesContext )

    const task = watch("task");
    const isSubmitDisable = !task;

    // Métodos
    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data)
        reset();
    }

    // Effects

    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="" onSubmit={ handleSubmit( handleCreateNewCycle ) }>

                <FormProvider {...newCycleForm} >
                    <CycleForm />
                </FormProvider>
                    
                <Countdown />

                { activeCycle 
                    ? (<StopButton type='button' onClick={ () => { interruptActiveCycle(); reset(); }  }>
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