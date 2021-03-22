import React from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface Props {
  types: Types;
  budgetStatus: 'over' | 'under' | 'within';
  selectedItems: Item[];
  priceRange: PriceRange;
  onChange: (item: Item) => void;
  incrementStep: () => void;
  decrementStep: () => void;
}

function ItemSelector(props: Props) {
  const handleChange = (e: React.MouseEvent<HTMLElement>, item: Item) => {
    props.onChange(item);
  };

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
                onChange={handleChange}
                value={props.selectedItems}
              >
                {props.types[key].map((item, i) => (
                  <ToggleButton value={item}>
                    {item.name} <br />
                    {`${currency.format(
                      item.lowPrice / 100
                    )} - ${currency.format(item.highPrice / 100)}`}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </FormControl>
      ))}
      <Button onClick={props.decrementStep} variant="contained" size="large">
        Previous Step
      </Button>
      <Button
        onClick={props.incrementStep}
        variant="contained"
        size="large"
        disabled={!props.selectedItems.length}
      >
        Next Step
      </Button>
    </Box>
  );
}

export default ItemSelector;
