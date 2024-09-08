import { styled } from "styled-components";


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