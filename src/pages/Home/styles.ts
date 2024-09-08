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


export const FormContainer = styled.form`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    width: 100%;
    gap: 0.5rem;

    color: ${ props => props.theme.gray100 };

    font-size: 1.125rem;
    font-weight: bold;
`;


export const CountContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;

    color: ${ props => props.theme.gray100 };

    display: flex;
    flex: 1;
    gap: 1rem;

    span {
        background: ${ props => props.theme.gray700 };
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`;

export const SeparatorContainer = styled.div`
    padding: 2rem 0;
    color: ${ props => props.theme.green500 };

    font-size: 10rem;
    width: 4rem;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
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

const BaseInput = styled.input`
    color: ${ props => props.theme.gray100 };
    background: transparent;

    border: 0;
    border-bottom: 2px solid ${ props => props.theme.gray500 };
    height: 2.5rem;
    padding: 0 0.5rem;

    font-weight: bold;
    font-size: 1.125rem;

    &:focus {
        box-shadow: none;
        border-color: ${ props => props.theme.green500 };
    }

    &::placeholder {
        color: ${ props => props.theme.gray500 };
    }

`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;