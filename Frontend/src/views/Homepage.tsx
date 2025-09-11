// import { useState } from "react";
import { Button } from '../components/common/Button';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import { CountryDropdown } from '../components/CountryDropdown';

const HomePage = () => {
    // const [searchQuery, setSearchQuery] = useState('');
    // const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='app-container'>       
      <h1>University App</h1>
      <div className="row-container">
        <CountryDropdown/>
        <p>Search</p>
      </div>
      <p>Data Table</p>
      <div className='row-container'>
        <Button
            text="Go To Favourites"
            onClick={() => navigate('/favourites')}
        />
        <Button
            text="Clear Filters"
            onClick={() => console.log('clear filters')}
        />
      </div>
    </div>
  )
}

export default HomePage;
