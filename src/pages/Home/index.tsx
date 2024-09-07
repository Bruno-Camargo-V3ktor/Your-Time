import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { CountContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartButton, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object( {
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5, 'O ciclo precisa ser de no minimo 5 minutos').max(60, 'O ciclo precisa ser de no maximo 60 minutos')
} )

//interface NewCycleFormData {
//    task: string,
//    minutesAmount: number
//}

type NewCycleFormData = zod.infer< typeof newCycleFormValidationSchema >

// *********************************************************** \\

export function Home(  ) {
    
    // Atributos
    const { register, handleSubmit, watch, reset, formState } = useForm< NewCycleFormData >( {
        resolver: zodResolver( newCycleFormValidationSchema ),
        defaultValues: { task: '', minutesAmount: 0 }
    } );
    const task = watch("task");
    const isSubmitDisable = !task;

    //console.log( formState.errors );

    // Métodos
    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data);
        reset();
    }

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

                      { ...register('minutesAmount', {valueAsNumber: true}) }
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountContainer>
                    <span>0</span>
                    <span>0</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>0</span>
                    <span>0</span>
                </CountContainer>

                <StartButton disabled={ isSubmitDisable } type='submit'>
                    <Play size={24}/>
                    Começar
                </StartButton >

            </form>
        </HomeContainer>
    )

}