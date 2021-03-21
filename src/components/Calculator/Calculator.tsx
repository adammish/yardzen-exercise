import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

interface Props {
  types: object;
  budget: null | number;
  onBudgetChange: (budget: number) => void;
}

function Calculator(props: Props) {
  // Makes sure e.curentTarget.value is a number with parseFloat
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onBudgetChange(parseFloat(e.currentTarget.value));
  };

  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" align="center">
        Calculator
      </Typography>
      {/* <Typography variant="body1">{JSON.stringify(props.types)}</Typography> */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl fullWidth component="fieldset">
            <InputLabel htmlFor="standard-adornment-budget">
              Insert your budget
            </InputLabel>
            <Input
              id="standard-adornment-budget"
              type="number"
              value={props.budget}
              onChange={handleBudgetChange}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mt={4}>
            {props.budget ? (
              <Typography variant="h5" component="h2">
                Your budget: ${props.budget}
              </Typography>
            ) : (
              <Typography variant="h5" component="h2">
                Please input your budget
              </Typography>
            )}
          </Box>
          <Box mt={4}>
            <Typography variant="h5" component="h2">
              Select items range: <br /> $40000
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Calculator;
