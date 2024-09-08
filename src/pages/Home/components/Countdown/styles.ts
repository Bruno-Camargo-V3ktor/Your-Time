import { styled } from "styled-components";


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