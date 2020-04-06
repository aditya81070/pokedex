import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../assets/img/pikachu.png';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  logo: {
    width: '48px',
    height: '48px',
  },
  brandName: {
    color: theme.palette.common.white,
    textDecoration: 'none',
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar variant='dense'>
        <Link to='/'>
          <img src={Logo} alt='Pokedex app logo' className={classes.logo} />
        </Link>
        <Typography variant='h6' className={classes.title}>
          <Link to='/' className={classes.brandName}>
            Pokedex
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
