import { useReducer } from 'react';
import ProductsFilter from './products-filter/product-filter';
import categoryFilterData from './categoryFilterData';
import priceFilterData from './priceFilterData';
import classes from './products.module.css';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import Link from '../Link';

export default function Products(props) {
  const defaultPageContent = {
    content: props.data,
    category: 'all-products',
    price: 'no-sorting',
  };
  const [filter, dispatchFilterAction] = useReducer(
    pageContentReducer,
    defaultPageContent
  );

  function pageContentReducer(state, action) {
    if (action.type === 'Category') {
      if (action.selection !== 'all-products') {
        return {
          content: props.data.filter((item) => {
            return item.category === action.selection;
          }),
          category: action.selection,
          price: state.price,
        };
      } else return defaultPageContent;
    }
    if (action.type === 'Price') {
      if (action.selection === 'no-sorting') {
        if (state.category !== 'all-products') {
          return {
            content: defaultPageContent.content.filter((item) => {
              return item.category === state.category;
            }),
            price: action.selection,
            category: state.category,
          };
        } else return defaultPageContent;
      }
      if (action.selection === 'expensive') {
        return {
          content: [...state.content].sort((a, b) => b.price - a.price),
          price: action.selection,
          category: state.category,
        };
      }
      if (action.selection === 'cheap') {
        return {
          content: [...state.content].sort((a, b) => a.price - b.price),
          price: action.selection,
          category: state.category,
        };
      }

      return defaultPageContent;
    }
  }

  function optionPickHandler(type, event) {
    dispatchFilterAction({ type, selection: event.target.value });
  }

  let renderedContent;

  if (filter.content.length > 0) {
    renderedContent = filter.content.map((element) => (
      <Grid
        key={element._id}
        container
        item
        xs={12}
        sm={6}
        md={3}
        component={Link}
        href={element._id}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box className={classes.container}>
          <Grid item xs={12} mt={2}>
            <Typography align="center" variant="h6">
              {element.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img className={classes.image} src={element.imageUrl} />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography align="center" variant="h6">
              {element.price + ' $'}
            </Typography>
          </Grid>
        </Box>
      </Grid>
    ));
  } else {
    renderedContent = (
      <Typography variant="h4" sx={{ my: 3 }}>
        There are no products matching criteria available!
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        m: 3,
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Grid container justifyContent="space-between" item xs={12}>
        <ProductsFilter
          filterData={categoryFilterData}
          onClick={optionPickHandler}
          activeFilter={filter.category}
        />
        <ProductsFilter
          filterData={priceFilterData}
          onClick={optionPickHandler}
          activeFilter={filter.price}
        />
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        {renderedContent}
      </Grid>
    </Box>
  );
}
