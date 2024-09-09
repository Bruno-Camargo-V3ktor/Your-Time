import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

// *********************************************************** \\


export function History( ) {
    
    // Atributos
    const { cycles } = useContext( CyclesContext );

    // Render 
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Inicio</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            cycles.map( (cycle) => 
                            (
                                <tr>
                                    <td>{ cycle.task }</td>
                                    <td>{ `${cycle.minutesAmount} Minutos` }</td>
                                    <td>{ formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBR }) }</td>
                            
                                    <td>
                                        { cycle.finishedDate && <Status statusColor="green">Concluido</Status> }

                                        { ( cycle.interruptDate && !cycle.finishedDate ) && <Status statusColor="red">Interrompido</Status> }

                                        { ( !cycle.interruptDate && !cycle.finishedDate ) && <Status statusColor="yellow">Em andamento</Status> }
                                    </td>
                                </tr>
                            ) 
                            ).reverse()
                        }
                    </tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    )

}
