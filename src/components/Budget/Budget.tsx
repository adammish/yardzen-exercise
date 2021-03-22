import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

interface Props {
  budget: number;
  onChange: (budget: number) => void;
}

function Budget(props: Props) {
  // Makes sure e.curentTarget.value is a number with parseFloat
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(parseFloat(e.currentTarget.value));
  };

  return (
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
      <FormControl fullWidth component="fieldset">
        <InputLabel htmlFor="standard-adornment-budget">
          Insert your budget
        </InputLabel>
        <Input
          id="standard-adornment-budget"
          type="number"
          value={props.budget ? props.budget : ''}
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </Box>
  );
}

export default Budget;
