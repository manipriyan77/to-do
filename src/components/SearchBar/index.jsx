import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import './styles.scss';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  return (
    <section className="search_container">
      <input
        type="search"
        name=""
        id=""
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search_bar"
      />
      <CiSearch className="search_icon" />
    </section>
  );
};

export default SearchBar;
