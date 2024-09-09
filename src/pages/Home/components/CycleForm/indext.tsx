import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CycleContext } from "../..";
import { useFormContext } from "react-hook-form";

// *********************************************************** \\

export function CycleForm() {
  
  // Atributos
  const { activeCycle } = useContext( CycleContext )
  const { register } = useFormContext()

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
              min={1}
              max={60}
                      
              disabled={ !!activeCycle }
              { ...register('minutesAmount', {valueAsNumber: true}) }
            />

            <span>minutos.</span>
        </FormContainer>
    )

}