import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CountryDropdown } from './CountryDropdown';
import { act } from 'react';

const mockCountries = ['Canada', 'India', 'USA', 'Australia'];

// Mock fetchCountries
jest.mock('../services/countryService', () => ({
  fetchCountries: jest.fn(() => Promise.resolve(mockCountries)),
}));

const mockCountryProps = {
  handleCountrySelect: jest.fn(),
  input: '',
  setInput: jest.fn(),
};

describe('CountryDropdown', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and label', async () => {
    render(<CountryDropdown {...mockCountryProps} />);
    expect(screen.getByLabelText('Select Country')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a country')).toBeInTheDocument();
  });

  it('shows suggestions when input is focused and typed', async () => {
    render(<CountryDropdown {...mockCountryProps} />);
    const input = screen.getByTestId('search-input');
    act(() => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Ind' } });
    });
    await waitFor(() => expect(screen.getByText('India')).toBeInTheDocument());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows "No Suggestions Found" when no match', async () => {
    render(<CountryDropdown {...mockCountryProps} />);
    const input = screen.getByTestId('search-input');
    act(() => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'XYZ' } });
    });
    await waitFor(() =>
      expect(screen.getByText('No Suggestions Found')).toBeInTheDocument(),
    );
  });

  it('calls handleCountrySelect and setInput when suggestion is clicked', async () => {
    render(<CountryDropdown {...mockCountryProps} />);
    const input = screen.getByTestId('search-input');
    act(() => {
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Can' } });
    });
    await waitFor(() => expect(screen.getByText('Canada')).toBeInTheDocument());
    act(() => {
      fireEvent.click(screen.getByText('Canada'));
    });
    expect(mockCountryProps.setInput).toHaveBeenCalledWith('Canada');
    expect(mockCountryProps.handleCountrySelect).toHaveBeenCalledWith('Canada');
  });
});
