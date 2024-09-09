

// *********************************************************** \\

import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History( ) {
    
    // Atributos
    const { cycles } = useContext( CyclesContext );

    // Render 
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <pre>
                { JSON.stringify(cycles) }
            </pre>

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
                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            
                            <td>
                                <Status statusColor="yellow">Em andamento</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>

                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            
                            <td>
                                <Status statusColor="red">Interrompido</Status>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </HistoryList>
        </HistoryContainer>
    )

}
