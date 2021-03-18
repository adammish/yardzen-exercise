import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from 'components/Header/Header';

function App() {
  return (
    <Container maxWidth="md">
      <Box my={4} p={4} bgcolor="white" boxShadow={1}>
        <Header />
      </Box>
    </Container>
  );
}

export default App;
