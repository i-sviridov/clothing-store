import classes from './products.module.css';
import { useReducer } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import Link from '../../Link';
import ProductsFilter from './products-filter/product-filter';

export default function Products(props) {
  const defaultPageContent = { content: props.data, category: 'all-products' };
  const [categoryFilter, dispatchCategoryFilterAction] = useReducer(
    pageContentReducer,
    defaultPageContent
  );

  function pageContentReducer(state, action) {
    if (action !== 'all-products') {
      return {
        content: props.data.filter((item) => {
          return item.category === action;
        }),
        category: action,
      };
    } else return defaultPageContent;
  }

  function optionPickHandler(event) {
    dispatchCategoryFilterAction(event.target.value);
  }

  return (
    <Box sx={{ m: 5 }}>
      <ProductsFilter
        onClick={optionPickHandler}
        activeFilter={categoryFilter}
      />

      <Grid container spacing={3} justifyContent="center">
        {categoryFilter.content.map((element) => (
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
        ))}
      </Grid>
    </Box>
  );
}
