
interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger' | 'success'
}

// ------------------------------------------------------------- ||

export function Button( props: ButtonProps ) {
    
    // Atributos
    const { color } = props;

    // Render
    return ( <> <button >Enviar</button> </> )
}