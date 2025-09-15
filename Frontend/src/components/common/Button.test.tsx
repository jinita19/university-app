import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render button correctly with minimum props', () => {
    const screen = render(<Button text="Click Me" onClick={() => {}} />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
    expect(button).toHaveClass('btn primary md');
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveAttribute('aria-disabled');
  });

  it('renders as disabled', () => {
    const screen = render(
      <Button text="Disabled" onClick={() => {}} disabled />,
    );
    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('triggers onClick when pressed', () => {
    const handleClick = jest.fn();
    const screen = render(<Button text="Click Me" onClick={handleClick} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets correct aria-label', () => {
    const screen = render(
      <Button
        text="Click Me"
        onClick={() => {}}
        ariaLabel="Click to perform an action"
      />,
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('aria-label', 'Click to perform an action');
  });

  it('applies correct size and type classes', () => {
    const screen = render(
      <Button text="Click Me" onClick={() => {}} type="secondary" size="lg" />,
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('btn secondary lg');
  });
});
