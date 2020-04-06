import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    height: '30px',
  },
  activeClass: {
    color: 'red',
  },
}));

const AutoCompleteSearch = ({ list, search, setSearch }) => {
  const [active, setActive] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const classes = useStyles();

  const handleSearchChange = (e) => {
    const userInput = e.target.value;
    setSearch(userInput);
    setActive(0);
    setShowSuggestions(true);
  };

  const handleItemClick = (e) => {
    setSearch(e.currentTarget.innerText);
    setActive(0);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setSearch(list[active].name.english);
      setShowSuggestions(false);
      setActive(0);
    } else if (e.keyCode === 38) {
      if (active === 0) {
        setActive(list.length - 1);
        return;
      }
      setActive((prevActive) => prevActive - 1);
    } else if (e.keyCode === 40) {
      if (active === list.length - 1) {
        setActive(0);
        return;
      }
      setActive((prevActive) => prevActive + 1);
    }
  };

  return (
    <div>
      <TextField
        variant='outlined'
        size='small'
        aria-label='search pokemon by name or type'
        placeholder='Search by name or type'
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
        }}
      />
      {showSuggestions && search ? (
        list.length ? (
          <ul>
            {list.map((suggestion, idx) => (
              <li
                key={suggestion.id}
                onClick={handleItemClick}
                className={active === idx ? classes.activeClass : ''}
              >
                {suggestion.name.english}
              </li>
            ))}
          </ul>
        ) : (
          <div>No Pokemon with current search</div>
        )
      ) : null}
    </div>
  );
};

export default AutoCompleteSearch;
