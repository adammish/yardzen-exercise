import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import logo from '/logo.png';

function App() {
  return (
    <Container maxWidth="md">
      <Box my={4} p={4} bgcolor="white" boxShadow={1}>
        <Box maxWidth={250} mx="auto" mb={1}>
          <Link href="https://yardzen.com" display="block" align="center">
            <img src="/logo.png" alt="Yardzen Logo" width="100%" />
          </Link>
        </Box>
        <Typography variant="h4" component="h1" align="center">
          Budget Calculator
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
