import { ButtonContainer, ButtonVariant } from '../styles/Button.styles';

// ------------------------------------------------------------- \\

interface ButtonProps {
    variant?: ButtonVariant
}

// ------------------------------------------------------------- \\

export function Button( props: ButtonProps ) {
    
    // Atributos
    const { variant: color='primary' } = props;

    // Render
    return ( 
    <> 
        <ButtonContainer variant={ color }  >
            Enviar
        </ButtonContainer> 
    </> 
    )
}