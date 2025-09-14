import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('Search Input Component', () => {
  const defaultProps = {
    value: 'uni1',
    id: 'uni1',
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onKeyDown: jest.fn(),
    accessibilityProps: {},
  };

  it('should be rendered correctly', () => {
    render(<SearchInput {...defaultProps} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toHaveValue('uni1');
  });

  it('should call handleInputChange when value is getting changed', () => {
    render(<SearchInput {...defaultProps} />);
    const searchInputElement = screen.getByTestId('search-input');
    fireEvent.change(searchInputElement, { target: { value: 'uni2' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should call handleFocus when input is focused', () => {
    render(<SearchInput {...defaultProps} />);
    const searchInputElement = screen.getByTestId('search-input');
    fireEvent.focus(searchInputElement);

    expect(defaultProps.onFocus).toHaveBeenCalledTimes(1);
  });

  it('should call handleKeyDown when any key is pressed', () => {
    render(<SearchInput {...defaultProps} />);
    const searchInputElement = screen.getByTestId('search-input');
    fireEvent.keyDown(searchInputElement);

    expect(defaultProps.onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should render correct aria props value when it has passed', () => {
    const inputAriaProps = {
      ...defaultProps,
      accessibilityProps: { role: 'searchbox' },
    };
    render(<SearchInput {...inputAriaProps} />);
    
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
