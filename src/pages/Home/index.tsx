
// *********************************************************** \\

import { Play } from "phosphor-react";
import { CountContainer, FormContainer, HomeContainer, MinutesAmountInput, SeparatorContainer, StartButton, TaskInput } from "./styles";

export function Home(  ) {
    
    // Render
        return (
        <HomeContainer>
            <form className="form-main" action="">

                <FormContainer>
                    <label htmlFor='task'>Vou trabalhar em</label>
                    <TaskInput 
                      id='task' 
                      type="text" 
                      placeholder="Dê um nome para o seu projeto" 
                      list="task-suggestions"
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

                <StartButton disabled type='submit'>
                    <Play size={24}/>
                    Começar
                </StartButton >

            </form>
        </HomeContainer>
    )

}