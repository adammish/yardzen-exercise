import React, { useState, useEffect } from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import { groupBy } from 'utility';
import db from 'firebase.config.js';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Header from 'components/Header/Header';
import Budget from 'components/Budget/Budget';
import ItemSelector from 'components/ItemSelector/ItemSelector';
import Results from 'components/Results/Results';

function App() {
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [types, setTypes] = useState<Types>({});
  const [budget, setBudget] = useState<number | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<'over' | 'under' | 'within'>(
    'within'
  );
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    lowPrice: 0,
    highPrice: 0
  });
  const [step, setStep] = useState<number>(1);
  const [budgetSubmitted, setBudgetSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchItems = async () => {
      // Fetch items from firebase
      try {
        const response = await db.collection('items').get();

        if (response.docs.length) {
          let fetchedItems: Item[] = [];
          response.docs.forEach((item) => {
            fetchedItems.push(item.data() as Item);
          });

          setTypes(prepTypes(fetchedItems));
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // Update priceRange whenever selectedItems changes
    const low = selectedItems.reduce((prev, next) => prev + next.lowPrice, 0);
    const high = selectedItems.reduce((prev, next) => prev + next.highPrice, 0);
    setPriceRange({ lowPrice: low, highPrice: high });
  }, [selectedItems]);

  useEffect(() => {
    // Update budgetStatus whenever priceRange or budget changes
    if (budget) {
      if (priceRange.lowPrice / 100 > budget) {
        setBudgetStatus('under');
      } else if (priceRange.highPrice / 100 < budget) {
        setBudgetStatus('over');
      } else {
        setBudgetStatus('within');
      }
    }
  }, [priceRange, budget]);

  const prepTypes = (items: Item[]): Types => {
    // Group items by type
    const preparedTypes = groupBy(items, (i) => i.type);

    Object.keys(preparedTypes).forEach((key) => {
      // In each group, remove duplicate items
      preparedTypes[key] = preparedTypes[key].filter(
        (v, i, a) => a.findIndex((t) => t.name === v.name) === i
      );
    });
    return preparedTypes;
  };

  const handleBudgetChange = (budget: number | null) => {
    setBudget(budget);
  };

  const handleSelectedItemsChange = (item: Item) => {
    // If item is already selected and clicked again, remove it
    if (selectedItems.find((o) => o.name === item.name)) {
      setSelectedItems(selectedItems.filter((o) => o.name !== item.name));
      // If selected already has an item with the same type, remove and replace it
    } else if (selectedItems.find((o) => o.type === item.type)) {
      const newItems = selectedItems.filter((o) => o.type !== item.type);
      setSelectedItems([...newItems, item]);
      // Else add to selected
    } else {
      setSelectedItems((selectedItems) => [...selectedItems, item]);
    }
  };

  // Send budget and selectedItems to firebase
  const submitBudgetResponse = async () => {
    try {
      await db.collection('adamMishBudgetResponse').add({
        budget: budget,
        items: selectedItems
      });

      setBudgetSubmitted(true);
    } catch (error) {
      console.log(error);
      setBudgetSubmitted(true);
      setSubmitError(true);
    }
  };

  const incrementStep = () => {
    setStep((step) => step + 1);
  };

  const decrementStep = () => {
    setStep((step) => step - 1);
  };

  return (
    <Container maxWidth="md">
      <Box my={4} p={4} bgcolor="white" boxShadow={1}>
        <Header />
        {!fetchError && (
          <Box>
            {/* Conditionally show components based on step in process */}
            {step === 1 && (
              <Budget
                budget={budget}
                onChange={handleBudgetChange}
                incrementStep={incrementStep}
              />
            )}
            {step === 2 && (
              <ItemSelector
                types={types}
                budget={budget}
                // budgetStatus={budgetStatus}
                selectedItems={selectedItems}
                priceRange={priceRange}
                onChange={handleSelectedItemsChange}
                incrementStep={incrementStep}
                decrementStep={decrementStep}
              />
            )}
            {step === 3 && (
              <Results
                budget={budget}
                budgetStatus={budgetStatus}
                priceRange={priceRange}
                budgetSubmitted={budgetSubmitted}
                submitError={submitError}
                decrementStep={decrementStep}
                onSubmit={submitBudgetResponse}
              />
            )}
          </Box>
        )}
        {fetchError && (
          <Box mt={4}>
            <Typography variant="h5" component="p">
              We're sorry, something happened while fetching the data, please
              try again later.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
