import React from 'react';
import { PriceRange } from 'interfaces';
import { currency } from 'utility';
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
  return (
    <Box mt={4}>
      <Typography variant="h5" component="p">
        Your current budget of{' '}
        <b>{props.budget ? currency(props.budget) : ''}</b> is{' '}
        <b>{props.budgetStatus}</b> the amount necessary to purchase this yard
        package, valued between{' '}
        <b>{currency(props.priceRange.lowPrice / 100)}</b> and{' '}
        <b>{currency(props.priceRange.highPrice / 100)}</b>.
      </Typography>
      <Box mt={4}>
        {props.budgetStatus !== 'under' && (
          <Typography variant="h5" component="p">
            Go ahead and submit your proposal!
          </Typography>
        )}
        {props.budgetStatus === 'under' && (
          <Typography variant="h5" component="p">
            Go back and edit your choices so that your budget is within or above
            the price range of the package.
          </Typography>
        )}
      </Box>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          onClick={props.decrementStep}
          variant="contained"
          size="large"
          color="secondary"
        >
          Change the items I selected
        </Button>
        <Button
          // onClick={props.decrementStep}
          variant="contained"
          size="large"
          color="primary"
          disabled={props.budgetStatus === 'under'}
        >
          Submit my proposal!
        </Button>
      </Box>
    </Box>
  );
}

export default Results;
