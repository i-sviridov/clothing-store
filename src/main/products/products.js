import classes from './products.module.css';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import Link from '../../Link';

export default function Products(props) {
  return (
    <Box sx={{ m: 5 }}>
      <Grid container spacing={3}>
        {props.data.map((element) => (
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
