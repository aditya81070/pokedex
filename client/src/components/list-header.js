import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AutoCompleteSearch from './autocomplete-search';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    background: '#f2f2f2',
    border: `1px solid #d9d9d9`,
    borderBottom: 'none',
  },
  searchInput: {
    height: '30px',
  },
}));
const ListHeader = ({ list = [] }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems='center' justify='space-between' className={classes.root}>
      <Grid item>
        <Typography variant='h6' component='h2'>
          Pokemon List
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <AutoCompleteSearch list={list} />
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to='/pokemon/add'
              variant='contained'
              color='primary'
              size='small'
            >
              Add Pokemon
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListHeader;
