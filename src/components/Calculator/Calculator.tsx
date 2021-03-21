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
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface Types {
  [key: string]: Item[];
}

interface Item {
  type: string;
  name: string;
  lowPrice: number;
  highPrice: number;
}

interface Props {
  types: Types;
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box mt={4} p={2} bgcolor="black" color="white">
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mt={4} p={2} bgcolor="black" color="white">
            <Typography variant="h5" component="h2">
              Select items range: $40000
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
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
          {Object.keys(props.types).map((key, i) => (
            <FormControl fullWidth component="fieldset">
              <Box key={i} mt={4}>
                <FormLabel component="legend">
                  {/* Replace underscore with space */}
                  {key.replace(/_/g, ' ')}
                </FormLabel>
                <Box mt={2}>
                  <ToggleButtonGroup
                    exclusive
                    aria-label="type"
                    size="large"
                    // value={values[key.toLowerCase()]}
                    // onChange={handleChange(key.toLowerCase())}
                  >
                    {props.types[key].map((item, i) => (
                      <ToggleButton value={item.name}>
                        {item.name} <br />
                        {`$${(item.lowPrice / 100).toFixed(2)} - $${(
                          item.highPrice / 100
                        ).toFixed(2)}`}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Box>
            </FormControl>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Calculator;
