import React from 'react';
import './Budget.css';
import CurrencyInput from 'react-currency-input-field';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

interface Props {
  budget: number | null;
  onChange: (budget: number) => void;
  incrementStep: () => void;
}

function Budget(props: Props) {
  // Send rawValue (as number) to set the state, while keeping
  // the value of the input a string formatted for currency
  const handleChange = (value: string | undefined): void => {
    const rawValue = value === undefined ? 'undefined' : value;
    props.onChange(parseFloat(rawValue));
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        To start, please input your budget:
      </Typography>
      <Box mt={4}>
        <FormControl fullWidth>
          <CurrencyInput
            id="budget-input"
            name="budget-input"
            className="budgetInput"
            placeholder="Please enter your budget"
            prefix={'$'}
            decimalsLimit={2}
            onValueChange={handleChange}
            value={props.budget ? props.budget?.toString() : ''}
          />
        </FormControl>
      </Box>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Grid container spacing={3} justify="flex-end">
          <Grid item xs={12} sm={6}>
            <Button
              onClick={props.incrementStep}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={!props.budget}
            >
              Next Step
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Budget;
