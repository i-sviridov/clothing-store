import classes from './single-product.module.css';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { FavoritesContext } from '../../../../context/favorites-context';

export default function singleProduct(props) {
  console.log(props);
  const ctx = useContext(FavoritesContext);
  return (
    <>
      <h1 className={classes['product-title']}>{props.data.title}</h1>
      <div className={classes['product-container']}>
        <img src={props.data.imageUrl} className={classes['product-image']} />
        <p className={classes['product-description']}>
          {props.data.description}
        </p>

        <div className={classes['product-color']}>
          <p>Color</p>
          <div className={classes['product-color-items']}>
            {props.data.colors.map((color) => (
              <div
                className={classes['product-color-item']}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className={classes['product-sizes']}>
          <p>Sizes</p>
          <select className={classes['product-select']}>
            {props.data.sizes.map((size) => {
              return <option>{size}</option>;
            })}
          </select>
        </div>
        <div className={classes['product-cart']}>
          <p className={classes['product-price']}>
            {+props.data.price + '.00 $'}
          </p>
          <div className={classes['product-amount']}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
        </div>

        <button>Add to cart</button>
        <button onClick={ctx.addItem}>Mark as favorites</button>
        <button>Back</button>
      </div>
    </>

    // <Grid container mt={5}>
    //   <Grid
    //     container
    //     item
    //     xs={12}
    //     lg={5}
    //     px={{ xs: '3rem', sm: '10rem', md: '15rem', lg: '0rem' }}
    //     pl={{ lg: '2rem' }}
    //   >
    //     <img src={props.data.imageUrl} className={classes.image} />
    //   </Grid>
    //   <Grid item container xs={12} lg={7} px={5} mt={{ xs: '5rem', lg: '0' }}>
    //     <Grid item xs={12}>
    //       <Typography
    //         variant="h4"
    //         align="center"
    //         sx={{
    //           fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.8rem' },
    //         }}
    //       >
    //         {props.data.title}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} mt={{ xs: '5rem', lg: '0' }}>
    //       <Typography
    //         variant="h5"
    //         align="center"
    //         sx={{
    //           fontSize: { xs: '1.2rem', sm: '1.3rem', lg: '1.5rem' },
    //         }}
    //       >
    //         {props.data.description}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} mt={{ xs: '5rem', lg: '0' }}>
    //       <Typography
    //         variant="h4"
    //         align="center"
    //         sx={{
    //           fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.8rem' },
    //         }}
    //       >
    //         {+props.data.price + '.00 $'}
    //       </Typography>
    //     </Grid>
    //     <Grid
    //       container
    //       item
    //       md={12}
    //       justifyContent="center"
    //       alignItems="center"
    //       mt={{ xs: '5rem', lg: '0' }}
    //     >
    //       <Grid
    //         item
    //         container
    //         xs={12}
    //         md={6}
    //         justifyContent="center"
    //         alignItems="center"
    //       >
    //         <Typography
    //           variant="h4"
    //           align="center"
    //           sx={{
    //             fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.8rem' },
    //           }}
    //         >
    //           {'Color '}
    //         </Typography>
    //         {props.data.colors.map((color) => (
    //           <Box
    //             sx={{
    //               width: { xs: '1.5rem ', lg: '2rem' },
    //               height: { xs: '1.5rem ', lg: '2rem' },
    //               borderRadius: '1rem',
    //               marginX: { xs: '0.5rem ', lg: '1rem' },
    //               backgroundColor: color,
    //             }}
    //           />
    //         ))}
    //       </Grid>
    //       <Grid
    //         item
    //         container
    //         xs={12}
    //         md={6}
    //         justifyContent="center"
    //         alignItems="center"
    //         mt={{ xs: '5rem', md: '0' }}
    //       >
    //         <Typography
    //           variant="h4"
    //           align="center"
    //           sx={{
    //             fontSize: { xs: '1.3rem', sm: '1.5rem', lg: '1.8rem' },
    //           }}
    //         >
    //           {'Sizes '}
    //         </Typography>

    //         <Box
    //           sx={{ p: '10px', fontSize: '1.2rem', mx: 3 }}
    //           component="select"
    //         >
    //           {props.data.sizes.map((size) => {
    //             return <option>{size}</option>;
    //           })}
    //         </Box>
    //       </Grid>
    //     </Grid>
    //     <Grid
    //       container
    //       item
    //       sx={12}
    //       justifyContent="center"
    //       alignItems="center"
    //       mt={{ xs: '5rem', lg: '0' }}
    //       mb={5}
    //     >
    //       <Grid
    //         item
    //         xs={6}
    //         container
    //         justifyContent="center"
    //         alignItems="center"
    //       >
    //         <button className={classes.button}>-</button>
    //         <div className={classes.amount}>1</div>
    //         <button className={classes.button}>+</button>
    //       </Grid>
    //       <Grid item xs={6} container justifyContent="center">
    //         <Button
    //           variant="contained"
    //           sx={{ color: 'black', borderColor: 'black' }}
    //         >
    //           Add to cart
    //         </Button>
    //         <Button
    //           onClick={ctx.addItem}
    //           variant="contained"
    //           sx={{ color: 'black', borderColor: 'black' }}
    //         >
    //           Add to favorites
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
  );
}
