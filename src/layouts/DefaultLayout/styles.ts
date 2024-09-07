import styled from "styled-components";

export const LayoutContainer = styled.div`
    max-width: 75rem;
    height: calc(100vh - 10rem);
    margin: 5rem auto;
    padding: 2.5rem;
    background: ${ props => props.theme.gray800 };
    border-radius: 8px;

    display: flex;
    flex-direction: column;

    nav {
        display: flex;
        gap: 0.5rem;

        a {
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${ props => props.theme.gray100 };

            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
            
            transition: border-bottom 0.25s;

            &:hover {
                border-bottom: 2px solid ${ props => props.theme.green500 };
            }

            &.active {
                color: ${props => props.theme.green500}
            }
        }

    }
`;