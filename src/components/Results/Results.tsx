import React from 'react';
import { PriceRange } from 'interfaces';
import { currency } from 'utility';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

interface Props {
  budget: number | null;
  budgetStatus: 'over' | 'under' | 'within';
  priceRange: PriceRange;
  budgetSubmitted: boolean;
  submitError: boolean;
  decrementStep: () => void;
  onSubmit: () => void;
}

function Results(props: Props) {
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    props.onSubmit();
  };

  return (
    <Box mt={4}>
      {!props.budgetSubmitted && (
        <Box>
          <Typography variant="h5" component="p">
            Your current budget of{' '}
            <b>{props.budget ? currency(props.budget) : ''}</b> is{' '}
            <b>{props.budgetStatus}</b> the amount necessary to purchase this
            yard package, valued between{' '}
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
                Go back and edit your choices so that your budget is within or
                above the price range of the package.
              </Typography>
            )}
          </Box>
          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={props.decrementStep}
                  variant="contained"
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  Change the items I selected
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                  disabled={props.budgetStatus === 'under'}
                  onClick={handleSubmit}
                >
                  Submit my proposal!
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      {/* On successful submission */}
      {props.budgetSubmitted && !props.submitError && (
        <Box mt={8}>
          <Typography variant="h5" component="p" align="center">
            Your budget has been submitted! 👍
          </Typography>
        </Box>
      )}
      {/* On submission error */}
      {props.submitError && (
        <Box mt={8}>
          <Typography variant="h5" component="p" align="center">
            Something went wrong with your submission 👎
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Results;
