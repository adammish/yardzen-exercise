import React from 'react';
import { PriceRange } from 'interfaces';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

interface Props {
  budget: number | null;
  budgetStatus: 'over' | 'under' | 'within';
  priceRange: PriceRange;
  decrementStep: () => void;
}

function Results(props: Props) {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        Select items range: {currency.format(props.priceRange.lowPrice / 100)} -{' '}
        {currency.format(props.priceRange.highPrice / 100)}
      </Typography>

      <Typography variant="h5" component="h2">
        You're {props.budgetStatus} your budget.
      </Typography>
      <Button onClick={props.decrementStep} variant="contained" size="large">
        Previous Step
      </Button>
    </Box>
  );
}

export default Results;
