import styled from "styled-components";


export const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    
    justify-content: center;
    align-items: center;

    .form-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }

`; 

const BaseButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const StartButton = styled(BaseButton)`
    background: ${ props => props.theme.green500 };
    color: ${ props => props.theme.gray100 };

    &:not(:disabled):hover {
        background: ${ props => props.theme.green700 };
    }
`;

export const StopButton = styled(BaseButton)`
    background: ${ props => props.theme.red500 };
    color: ${ props => props.theme.gray100 };

    &:not(:disabled):hover {
        background: ${ props => props.theme.red700 };
    }
`;