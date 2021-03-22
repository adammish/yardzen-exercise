import React from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import { currency } from 'utility';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
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
      {/* Map over types and list */}
      {Object.keys(props.types).map((key, i) => (
        <FormControl fullWidth component="fieldset" key={key}>
          <Box key={i} mt={4}>
            <Typography variant="body1">
              {/* Replace underscore with space */}
              {key.replace(/_/g, ' ')}
            </Typography>
            <Box mt={2}>
              <ToggleButtonGroup
                exclusive
                aria-label="type"
                size="large"
                onChange={handleChange}
                value={props.selectedItems}
              >
                {/* For each item in a type, map over it */}
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
              Change my budget
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={props.incrementStep}
              variant="contained"
              size="large"
              color="primary"
              fullWidth
              disabled={!props.selectedItems.length}
            >
              See my results!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ItemSelector;
