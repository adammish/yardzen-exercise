import React, { useState, useEffect } from 'react';
import { Types, Item, PriceRange } from 'interfaces';
import db from 'firebase.config.js';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from 'components/Header/Header';
import Budget from 'components/Budget/Budget';
import ItemSelector from 'components/ItemSelector/ItemSelector';
import Results from 'components/Results/Results';

function App() {
  const [types, setTypes] = useState<Types>({});
  const [budget, setBudget] = useState<number>(0);
  const [budgetStatus, setBudgetStatus] = useState<'over' | 'under' | 'within'>(
    'within'
  );
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    lowPrice: 0,
    highPrice: 0
  });

  useEffect(() => {
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
    if (priceRange.lowPrice / 100 > budget) {
      setBudgetStatus('under');
    } else if (priceRange.highPrice / 100 < budget) {
      setBudgetStatus('over');
    } else {
      setBudgetStatus('within');
    }
  }, [priceRange, budget]);

  const fetchItems = async () => {
    // Fetch items from firebase
    const response = await db.collection('items').get();
    let fetchedItems: Item[] = [];
    response.docs.forEach((item) => {
      fetchedItems.push(item.data() as Item);
    });

    setTypes(prepTypes(fetchedItems));
  };

  const prepTypes = (items: Item[]): Types => {
    // Group items by type
    const preparedTypes = groupBy(items, (i) => i.type);

    Object.keys(preparedTypes).map((key, i) => {
      // In each group, remove duplicate items
      preparedTypes[key] = preparedTypes[key].filter(
        (v, i, a) => a.findIndex((t) => t.name === v.name) === i
      );
    });
    return preparedTypes;
  };

  const handleBudgetChange = (budget: number) => {
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

  const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
    list.reduce((previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    }, {} as Record<K, T[]>);

  return (
    <Container maxWidth="md">
      <Box my={4} p={4} bgcolor="white" boxShadow={1}>
        <Header />
        <Budget budget={budget} onChange={handleBudgetChange} />
        <ItemSelector
          types={types}
          budgetStatus={budgetStatus}
          selectedItems={selectedItems}
          priceRange={priceRange}
          onChange={handleSelectedItemsChange}
        />
        <Results
          budget={budget}
          budgetStatus={budgetStatus}
          priceRange={priceRange}
        />
      </Box>
    </Container>
  );
}

export default App;
