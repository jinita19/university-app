import "./Button.css";

type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "primary" | "secondary";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  type?: ButtonType;
  size?: ButtonSize;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  type = "primary",
  size = "md",
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${type} ${size} ${disabled ? "disabled" : ""}`}
    >
      {text}
    </button>
  );
};
