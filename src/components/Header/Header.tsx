import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

function Header() {
  return (
    <Box>
      <Box maxWidth={250} mx="auto" mb={1}>
        <Link href="https://yardzen.com" display="block" align="center">
          <img src="/logo.png" alt="Yardzen Logo" width="100%" />
        </Link>
      </Box>
      <Typography variant="h4" component="h1" align="center">
        Budget Calculator
      </Typography>
    </Box>
  );
}

export default Header;
