import styled from "styled-components";

export const HistoryContainer = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column;

    padding: 3.5rem;

    h1 {
        font-size: 1.5rem;
        color: ${ props => props.theme.gray100 };
    }

`;

export const HistoryList = styled.div`
    flex: 1;

    overflow: auto;
    margin-top: 2rem;

    table {
        width: 100%;
        min-width: 600px;
        border-collapse: collapse;
        
        th {
            background: ${ props => props.theme.gray600 };
            color: ${ props => props.theme.gray100 };

            padding: 1rem;

            font-size: 0.875rem;
            text-align: left;
            line-height: 1.6;

            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }

        }

        td {
            background: ${ props => props.theme.gray700 };

            border-top: 4px solid ${ props => props.theme.gray800 };
            padding: 1rem;

            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-right: 1.5rem;
            }

        }

    }
`;