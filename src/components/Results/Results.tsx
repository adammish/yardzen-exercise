import React from 'react';
import { PriceRange } from 'interfaces';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface Props {
  budget: number;
  budgetStatus: 'over' | 'under' | 'within';
  priceRange: PriceRange;
}

function Results(props: Props) {
  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        Select items range: ${props.priceRange.lowPrice} - $
        {props.priceRange.highPrice}
      </Typography>

      <Typography variant="h5" component="h2">
        You're {props.budgetStatus} your budget.
      </Typography>
    </Box>
  );
}

export default Results;
