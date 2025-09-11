import './Button.css';

type ButtonProps = {
    text: string,
    onClick: () => void,
    disabled?: boolean,
    type?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({text, onClick, disabled=false, type='primary'}) => {
    return <button
        disabled={disabled}
        onClick={onClick}
        className={type == 'primary' ? 'primary-btn' : 'secondary-btn'}
    >
       {text}
    </button>
}