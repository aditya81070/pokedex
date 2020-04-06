import React from 'react';
import Header from './header';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
const Wrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container maxWidth='md' className={classes.container}>
        {children}
      </Container>
    </>
  );
};

export default Wrapper;
