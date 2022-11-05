import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';

import Link from '../../Link';
import classes from '../products.module.css';
import { motion } from 'framer-motion';

const ProductionVariants = {
  initial: { y: 150 },
  animate: {
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 2 },
  },
};

const MotionProps = {
  initial: 'initial',
  whileInView: 'animate',
  viewport: { once: true },
  variants: ProductionVariants,
};

export default function ProductItem(props) {
  const [resetKey, setResetKey] = useState(props.data._id);

  useEffect(() => {
    setResetKey((prevValue) => prevValue.split('').reverse().join(''));
  }, [props.filter]);

  return (
    <Grid
      key={resetKey}
      container
      item
      xs={12}
      sm={6}
      md={3}
      component={Link}
      href={props.data._id}
      sx={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        className={classes.container}
        component={motion.div}
        {...MotionProps}
      >
        <Grid item xs={12} mt={2}>
          <Typography align="center" variant="h6">
            {props.data.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img className={classes.image} src={props.data.imageUrl} />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Typography align="center" variant="h6">
            {props.data.price + ' $'}
          </Typography>
        </Grid>
      </Box>
    </Grid>
  );
}
