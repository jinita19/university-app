import './SearchInput.css'

type SearchInputProps = {
  value: string;
  id: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  id,
  placeholder,
  onChange,
  onKeyDown,
  onFocus = () => {},
}) => {
  return (
    <>
      <input
        type="text"
        value={value}
        id={id}
        className="search-input"
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
      />
    </>
  );
};
