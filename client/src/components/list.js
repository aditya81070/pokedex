import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const searchList = (list = [], searchValue = '') => {
  const searchValueList = searchValue
    .split(' ')
    .filter((e) => String(e).trim())
    .map((e) => e.toLowerCase());
  if (!searchValue) return list;
  return list.filter((item) => {
    return (
      item.name.english.toLowerCase().includes(searchValue.toLowerCase()) ||
      searchValueList.every(
        (searchType) => item.type.map((t) => t.toLowerCase()).indexOf(searchType) >= 0,
      )
    );
  });
};
export default function List(props) {
  const [searchValue, setSearchValue] = React.useState('');
  const [data, setData] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/pokemons`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
  const goToEdit = (id) => () => {
    history.push(`/pokemon/${id}/edit`);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredList = searchList(data, searchValue);
  return (
    <div>
      <input
        placeholder='enter name or type of pokemon'
        value={searchValue}
        onChange={handleSearchChange}
      />
      <ul>
        {searchValue && filteredList.map((item) => <li key={item.id}>{item.name.english}</li>)}
      </ul>
      {data.length > 0 ? (
        data.map((pokemon) => (
          <div key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name.english}</Link>
            <button onClick={goToEdit(pokemon.id)}>Edit</button>
          </div>
        ))
      ) : (
        <p>Loading the pokemon list...</p>
      )}
    </div>
  );
}
