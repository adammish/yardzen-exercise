import React from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import { currency } from 'utility';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

interface Props {
  types: Types;
  budget: number | null;
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

  return (
    <Box mt={4}>
      <Typography variant="h5" component="h2">
        Next, choose which items you want to have in your yard:
      </Typography>
      {Object.keys(props.types).map((key, i) => (
        <FormControl fullWidth component="fieldset" key={key}>
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
                  <ToggleButton value={item} key={item.name}>
                    {item.name} <br />
                    {`${currency(item.lowPrice / 100)} - ${currency(
                      item.highPrice / 100
                    )}`}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </FormControl>
      ))}
      {/* Show only if any items are selected */}
      {!!props.selectedItems.length && (
        <Box mt={4}>
          <Typography variant="h5" component="h2">
            The items you selected have a price range of{' '}
            <b>
              {currency(props.priceRange.lowPrice / 100)} -{' '}
              {currency(props.priceRange.highPrice / 100)}
            </b>
            .
          </Typography>
        </Box>
      )}
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          onClick={props.decrementStep}
          variant="contained"
          size="large"
          color="secondary"
        >
          Change my budget
        </Button>
        <Button
          onClick={props.incrementStep}
          variant="contained"
          size="large"
          color="primary"
          disabled={!props.selectedItems.length}
        >
          See my results!
        </Button>
      </Box>
    </Box>
  );
}

export default ItemSelector;
