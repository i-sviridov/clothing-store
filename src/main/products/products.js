import classes from './products.module.css';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Products(props) {
  return (
    <Box sx={{ m: 5 }}>
      <Grid container spacing={3}>
        {props.data.map((element) => (
          <Grid container item xs={12} sm={6} md={3}>
            <Box className={classes.container}>
              <Box className={classes.svgbox}>
                <SearchIcon className={classes.svgitem} />
                <FavoriteBorderIcon className={classes.svgitem} />
                <AddShoppingCartIcon className={classes.svgitem} />
              </Box>
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

export default Products;