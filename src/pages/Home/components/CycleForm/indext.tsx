import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

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

export function CycleForm() {
    
  // States
  const { register, handleSubmit, watch, reset } = useForm< NewCycleFormData >( {
    resolver: zodResolver( newCycleFormValidationSchema ),
    defaultValues: { task: '', minutesAmount: 0 }
  } );

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

  // Render
    return (
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
    )

}