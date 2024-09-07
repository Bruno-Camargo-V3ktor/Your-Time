

// *********************************************************** \\

import { HistoryContainer, HistoryList } from "./styles";

export function History( ) {
    
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
                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluido</td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluido</td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluido</td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluido</td>
                        </tr>

                        <tr>
                            <td>Tarefa #1</td>
                            <td>30 Minutos</td>
                            <td>Há 2 meses</td>
                            <td>Concluido</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )

}
