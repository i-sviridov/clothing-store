import * as React from 'react';

import Products from '../components/products/products';
import WelcomePart from '../components/welcome-part/welcome-part';
import { connectToDatabase } from '../lib/auth';

export default function Index(props) {
  const parsedData = JSON.parse(props.data);

  return (
    <main>
      <WelcomePart />
      <Products data={parsedData}></Products>
    </main>
  );
}

export async function getServerSideProps() {
  async function fetchData() {
    const client = await connectToDatabase();
    const database = client.db('clothing-store');
    const collection = database.collection('items');
    const data = await collection.find().toArray();
    client.close();
    return data;
  }

  const data = await fetchData();
  return {
    props: {
      data: JSON.stringify(data),
    },
  };
}
