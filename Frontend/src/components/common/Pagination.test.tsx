import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  const mockProps = {
    currentPage: 0,
    totalPages: 5,
    rowsPerPage: 10,
    onLimitChange: jest.fn(),
    onPrevClick: jest.fn(),
    onNextClick: jest.fn(),
  };

  test('renders pagination with correct values', () => {
    render(<Pagination {...mockProps} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('1 of 5')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('10');
    ['5', '10', '15'].forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
    });
  });

  test('calls correct callbacks when Prev/Next button clicked', () => {
    const paginationProps = {...mockProps, currentPage: 2};
    render(<Pagination  {...paginationProps}/>);
    fireEvent.click(screen.getByText('<< Prev'));
    expect(mockProps.onPrevClick).toHaveBeenCalled();
    fireEvent.click(screen.getByText('Next >>'));
    expect(mockProps.onNextClick).toHaveBeenCalled();
  });

  test('Prev button disabled at page 0', () => {
    const props = { ...mockProps, currentPage: 0 };
    render(<Pagination {...props} />);
    expect(screen.getByText('<< Prev')).toBeDisabled();
  });

  test('Next button should not be disabled apart from last page', () => {
    const props = { ...mockProps, currentPage: 3 };
    render(<Pagination {...props} />);
    expect(screen.getByText('Next >>')).not.toBeDisabled();
  });
});
