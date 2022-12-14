import Products from '../components/products/products';
import Link from '../components/Link';
import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { connectToDatabase } from '../lib/auth';
import Button from '@mui/material/Button';
const mongodb = require('mongodb');

import { motion } from 'framer-motion';

const ProductionVariants = {
  initial: { y: 350 },
  animate: {
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 4 },
  },
};

const MotionProps = {
  initial: 'initial',
  animate: 'animate',
  viewport: { once: true },
  variants: ProductionVariants,
};

export default function Index(props) {
  const [hasFavoritesData, setHasFavoritesData] = useState(true);

  const parsedData = JSON.parse(props.data);

  useEffect(() => {
    if (parsedData.length === 0) {
      setHasFavoritesData(false);
    }
  }, [parsedData]);

  return (
    <>
      <Products data={parsedData}></Products>
      {!hasFavoritesData && (
        <Typography textAlign="center" variant="h4" sx={{ my: 3 }}>
          You have no favorites items yet. Try to add some!
        </Typography>
      )}

      <Box
        component={Link}
        href="/"
        sx={{ textDecoration: 'none' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          component={motion.button}
          {...MotionProps}
          variant="contained"
          color="secondary"
          sx={{ width: '12rem', my: 5 }}
        >
          Back to main page
        </Button>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;

  let cookiesData = [];
  if (cookies) {
    cookiesData = cookies
      .split('; ')
      .filter((item) => {
        return item.startsWith('633');
      })
      .map((item) => item.split('=')[0])
      .map((item) => {
        return new mongodb.ObjectID(item);
      });
  }

  async function fetchData() {
    const client = await connectToDatabase();
    const database = client.db('clothing-store');
    const collection = database.collection('items');
    const data = await collection.find({ _id: { $in: cookiesData } }).toArray();
    client.close();
    return data;
  }

  const data = await fetchData();
  return {
    props: { data: JSON.stringify(data) },
  };
}
