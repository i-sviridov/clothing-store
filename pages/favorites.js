import Products from '../components/products/products';
import Link from '../components/Link';
import Box from '@mui/material/Box';

import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import { connectToDatabase } from '../lib/auth';
const mongodb = require('mongodb');

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

      <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
        <button className={`button center-block-element`}>
          Back to main page
        </button>
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
      .map((item) => item.split('=')[0])
      .map((item) => new mongodb.ObjectID(item));
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
