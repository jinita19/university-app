import { render, fireEvent, screen } from '@testing-library/react';
import { DataTable } from './DataTable';
import type { University } from '../types/types';

const mockList: University[] = [
  {
    id: 1,
    name: 'Uni1',
    stateProvince: 'Test State',
    webPages: ['http://test.edu'],
    isFavourite: false,
  },
  {
    id: 2,
    name: 'Uni2',
    stateProvince: null,
    webPages: ['http://fav.edu'],
    isFavourite: true,
  },
];

describe('DataTable', () => {
  it('renders table headers', () => {
    render(<DataTable list={mockList} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('State/Province')).toBeInTheDocument();
    expect(screen.getByText('Web Pages')).toBeInTheDocument();
  });

  it('renders university rows', () => {
    render(<DataTable list={mockList} />);
    expect(screen.getByText('Uni1')).toBeInTheDocument();
    expect(screen.getByText('Uni2')).toBeInTheDocument();
    expect(screen.getByText('Test State')).toBeInTheDocument();
    expect(screen.getByText('NA')).toBeInTheDocument();
    expect(screen.getByText('http://test.edu')).toBeInTheDocument();
    expect(screen.getByText('http://fav.edu')).toBeInTheDocument();
    expect(screen.getByText('Add To Favourites')).toBeInTheDocument();
    expect(screen.getByText('Remove From Favourites')).toBeInTheDocument();
  });

  it('shows "No Rows Available" when list is empty', () => {
    render(<DataTable list={[]} />);
    expect(screen.getByText('No Rows Available')).toBeInTheDocument();
  });

  it('calls handleFavouriteToggle when Add To Favourites is clicked', () => {
    const handleFavouriteToggle = jest.fn();
    render(
      <DataTable
        list={mockList}
        handleFavouriteToggle={handleFavouriteToggle}
        pageType="search"
      />,
    );
    const addBtn = screen.getByLabelText('Add Uni1 to favourites');
    fireEvent.click(addBtn);
    expect(handleFavouriteToggle).toHaveBeenCalledWith(1);
  });

  it('calls handleRemoveFavourite when Remove From Favourites is clicked', () => {
    const handleRemoveFavourite = jest.fn();
    render(
      <DataTable
        list={mockList}
        handleRemoveFavourite={handleRemoveFavourite}
        pageType="favourite"
      />,
    );
    const removeBtn = screen.getByLabelText('Remove Uni2 from favourites');
    fireEvent.click(removeBtn);
    expect(handleRemoveFavourite).toHaveBeenCalledWith(2);
  });

  it('pagination changes page', () => {
    const paginationList = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Uni ${i + 1}`,
      stateProvince: 'State',
      webPages: [`http://uni${i + 1}.edu`],
      isFavourite: false,
    }));
    render(<DataTable list={paginationList} />);
    expect(screen.getByText('Uni 1')).toBeInTheDocument();
    // Go to next page
    fireEvent.click(screen.getByText('Next >>'));
    expect(screen.getByText('Uni 6')).toBeInTheDocument();
  });
});
