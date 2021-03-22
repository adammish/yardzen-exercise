import React from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface Props {
  types: Types;
  budgetStatus: 'over' | 'under' | 'within';
  selectedItems: Item[];
  priceRange: PriceRange;
  onChange: (item: Item) => void;
}

function ItemSelector(props: Props) {
  const handleChange = (e: React.MouseEvent<HTMLElement>, item: Item) => {
    props.onChange(item);
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        Select items range: ${props.priceRange.lowPrice} - $
        {props.priceRange.highPrice}
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
    </Box>
  );
}

export default ItemSelector;
