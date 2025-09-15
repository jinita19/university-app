import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FavouritesPage from './FavouritesPage';
import {
  getFavouriteUniversities,
  removeFavorite,
} from '../services/favouriteUniService';
import { act } from 'react';

jest.mock('../services/favouriteUniService', () => ({
  getFavouriteUniversities: jest.fn(),
  removeFavorite: jest.fn(),
}));

jest.mock('../helpers', () => ({
  mapUniversityData: jest.fn((list) => list),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const favourites = [
  { id: 1, name: 'Uni1', isFavourite: true },
  { id: 2, name: 'Uni2', isFavourite: true },
];

describe('FavouritesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner initially', () => {
    (getFavouriteUniversities as jest.Mock).mockReturnValue(
      new Promise(() => {}),
    );
    render(<FavouritesPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error message on API failure', async () => {
    (getFavouriteUniversities as jest.Mock).mockRejectedValue(
      new Error('fail'),
    );
    render(<FavouritesPage />);
    await waitFor(() =>
      expect(
        screen.getByText('Error fetching favourites list'),
      ).toBeInTheDocument(),
    );
  });

  it('renders heading, DataTable and Button correctly', async () => {
    (getFavouriteUniversities as jest.Mock).mockResolvedValue(favourites);
    render(<FavouritesPage />);
    await waitFor(() => {
      expect(screen.getByText('My Favourite Universities')).toBeInTheDocument();
      expect(screen.getByTestId('datatable')).toBeInTheDocument();
      expect(screen.getByText('Back To Search')).toBeInTheDocument();
      expect(screen.queryAllByText('Remove From Favourites')).toHaveLength(2);
    });
  });

  it('calls removeFavorite and updates list on removing a favourite', async () => {
    (getFavouriteUniversities as jest.Mock).mockResolvedValue(favourites);
    render(<FavouritesPage />);
    await waitFor(() => {
      expect(screen.queryAllByText('Remove From Favourites')).toHaveLength(2);
    });
    act(() => {
      screen.getAllByText('Remove From Favourites')[0].click();
    });
    await waitFor(() => {
      expect(removeFavorite).toHaveBeenCalledWith(1);
      expect(screen.queryAllByText('Remove From Favourites')).toHaveLength(1);
    });
  });

  it('navigates to search page', async () => {
    (getFavouriteUniversities as jest.Mock).mockResolvedValue(favourites);
    render(<FavouritesPage />);
    await waitFor(() =>
      expect(screen.getByText('Back To Search')).toBeInTheDocument(),
    );
    act(() => {
      fireEvent.click(screen.getByText('Back To Search'));
    });
    expect(mockNavigate).toHaveBeenCalledWith('/search');
  });
});
