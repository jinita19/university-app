import './Button.css';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'primary' | 'secondary';

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
  ariaLabel?: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = 'primary',
  size = 'md',
  ariaLabel,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled ? 'true' : undefined}
      aria-label={ariaLabel}
      data-testid="button"
      className={`btn ${type} ${size} ${disabled ? 'disabled' : ''}`}
    >
      {text}
    </button>
  );
};
