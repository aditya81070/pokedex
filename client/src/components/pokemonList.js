import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  list: {
    border: `1px solid ${theme.palette.divider}`,
  },
  deleteIcon: {
    marginLeft: theme.spacing(1),
  },
  listItemText: {
    color: theme.palette.text.primary,
  },
}));
export default function PokemonList(props) {
  const { pokemons } = props;
  const classes = useStyles();
  return (
    <Container maxWidth='md' className={classes.container}>
      <List className={classes.list}>
        {pokemons.map((pokemon) => (
          <ListItem key={pokemon.id} divider component={Link} to={`/pokemon/${pokemon.id}`}>
            <ListItemText
              primary={pokemon.name.english}
              primaryTypographyProps={{
                className: classes.listItemText,
              }}
            />
            <ListItemSecondaryAction>
              <Tooltip title='Edit' leaveTouchDelay={700}>
                <IconButton edge='end' aria-label='edit'>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              {pokemon.id > 150 && (
                <Tooltip title='Delete' leaveTouchDelay={700}>
                  <IconButton edge='end' aria-label='delete' className={classes.deleteIcon}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
