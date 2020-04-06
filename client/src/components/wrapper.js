import React from 'react';
import Header from './header';
import Container from '@material-ui/core/Container';

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth='md'>{children}</Container>
    </>
  );
};

export default Wrapper;
