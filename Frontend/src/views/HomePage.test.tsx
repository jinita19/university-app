/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import HomePage from './HomePage';
import { fetchUniversities } from '../services/universityService';
import * as favUniService from '../services/favouriteUniService';

// Mock route navigation
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../services/universityService');
jest.mock('../services/favouriteUniService');

jest.mock('../services/favouriteUniService', () => ({
  getFavouriteUniversities: jest.fn(),
  removeFavorite: jest.fn(),
  addFavorite: jest.fn(),
}));

jest.mock('../services/universityService', () => ({
  fetchUniversities: jest.fn(),
}));

jest.mock('../helpers', () => ({
  mapUniversityData: jest.fn((list) => list),
  setApiStatus: jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    (from: string, setData: Function) => (res: any) =>
      setData({
        endpoint: 'test',
        status: res.status,
        duration: 100,
        isError: from === 'error',
      }),
  ),
}));

jest.mock('../components/CountryDropdown', () => ({
  CountryDropdown: ({ setInput, handleCountrySelect }: any) => (
    <select
      aria-label="Country Select"
      onChange={(e) => {
        setInput(e.target.value);
        handleCountrySelect(e.target.value);
      }}
      data-testid="mock-country-select"
    >
      <option value="">Select...</option>
      <option value="Canada">Canada</option>
      <option value="India">India</option>
    </select>
  ),
}));

const mockUniversities = [
  { id: 1, name: 'Uni1', country: 'Canada', isFavourite: false },
  { id: 2, name: 'Uni2', country: 'Canada', isFavourite: true },
];

describe('HomePage', () => {
  beforeEach(() => {
    (fetchUniversities as jest.Mock).mockResolvedValue({
      data: mockUniversities,
      status: 200,
    });
    jest.clearAllMocks();
  });

  it('renders HomePage Correctly', async () => {
    render(<HomePage />);

    const countrySelect = screen.getByTestId('mock-country-select');
    act(() => {
      fireEvent.change(countrySelect, { target: { value: 'Canada' } });
    });
    expect(await screen.findByText('Uni1')).toBeInTheDocument();
    expect(await screen.findByText('Uni2')).toBeInTheDocument();
    expect(screen.getByText('Go To Favourites')).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
    expect(screen.getByText('Show API details')).toBeInTheDocument();
  });

  it('handle remove and add favourite', async () => {
    render(<HomePage />);
    const countrySelect = screen.getByTestId('mock-country-select');
    act(() => {
      fireEvent.change(countrySelect, { target: { value: 'Canada' } });
    });

    // Wait for rows to appear
    await screen.findByText('Uni1');
    await screen.findByText('Uni2');

    // Remove favourite
    const removeBtn = screen.getAllByRole('button')[1];
    (favUniService.removeFavorite as jest.Mock).mockResolvedValueOnce({});
    act(() => {
      removeBtn.click();
    });
    await waitFor(() =>
      expect(favUniService.removeFavorite).toHaveBeenCalledWith(2),
    );

    // Add favourite
    const addBtn = screen.getAllByRole('button')[0];
    (favUniService.addFavorite as jest.Mock).mockResolvedValueOnce({});
    act(() => {
      addBtn.click();
    });
    await waitFor(() =>
      expect(favUniService.addFavorite).toHaveBeenCalledWith(1),
    );
  });

  it('handles no api data available if api is not called', async () => {
    render(<HomePage />);
    const detailsBtn = screen.getByText('Show API details');
    act(() => {
      fireEvent.click(detailsBtn);
    });
    await waitFor(() => {
      expect(
        screen.getByText('No Api Details Available To Show'),
      ).toBeInTheDocument();
    });
  });

  it('navigates to favourites page', async () => {
    render(<HomePage />);
    const favBtn = screen.getByText('Go To Favourites');
    fireEvent.click(favBtn);
    expect(mockNavigate).toHaveBeenCalledWith('/favourites');
  });

  it('clears filters when Clear Filters is clicked', async () => {
    render(<HomePage />);
    const countrySelect = screen.getByTestId('mock-country-select');
    act(() => {
      fireEvent.change(countrySelect, { target: { value: 'India' } });
    });
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Clear Filters' });
    act(() => {
      fireEvent.change(input, { target: { value: 'we' } });
      button.click();
      fireEvent.change(countrySelect, { target: { value: 'Canada' } });
    });
    expect(input).toHaveValue('');
    expect(countrySelect).toHaveValue('Canada');
  });
});
