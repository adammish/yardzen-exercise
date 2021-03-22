import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

interface Props {
  budget: number | null;
  onChange: (budget: number) => void;
  incrementStep: () => void;
}

function Budget(props: Props) {
  // Makes sure e.curentTarget.value is a number with parseFloat
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(parseFloat(e.currentTarget.value));
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        To start, please input your budget:
      </Typography>
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
      <Button
        onClick={props.incrementStep}
        variant="contained"
        size="large"
        disabled={!props.budget}
      >
        Next Step
      </Button>
    </Box>
  );
}

export default Budget;
