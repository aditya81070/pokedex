import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import searchList from '../helpers/search-list';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  input: {
    height: '30px',
  },
  root: {
    position: 'relative',
  },
  filteredList: {
    padding: 0,
    maxHeight: '200px',
    overflow: 'auto',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    width: '400px',
    top: '40px',
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  },
  noData: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

const AutoCompleteSearch = ({ list }) => {
  const [search, setSearch] = useState('');
  const history = useHistory();
  const filteredList = searchList(list, search);
  const classes = useStyles();

  const handleSearchChange = (e) => {
    const userInput = e.target.value;
    setSearch(userInput);
  };

  const handleItemClick = (id) => () => {
    history.push(`/pokemon/${id}`);
  };

  return (
    <div className={classes.root}>
      <TextField
        variant='outlined'
        size='small'
        aria-label='search pokemon by name or type'
        placeholder='Search by name or type'
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon fontSize='small' />
            </InputAdornment>
          ),
        }}
      />
      {search ? (
        filteredList.length > 0 ? (
          <List dense className={classes.filteredList}>
            <ListSubheader>Pokemon name & type</ListSubheader>
            {filteredList.map((suggestion, idx) => (
              <ListItem
                dense
                divider
                button
                alignItems='flex-start'
                key={suggestion.id}
                onClick={handleItemClick(suggestion.id)}
              >
                <ListItemText>{suggestion.name.english}</ListItemText>
                <ListItemSecondaryAction>
                  {suggestion.type.map((t, idx) => (
                    <span key={t}>
                      {t}
                      {idx < suggestion.type.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <div className={classnames(classes.filteredList, classes.noData)}>
            No Pokemon with current search
          </div>
        )
      ) : null}
    </div>
  );
};

export default AutoCompleteSearch;
