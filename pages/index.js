import * as React from 'react';
import Products from '../src/products/products';

import { MongoClient } from 'mongodb';

export default function Index(props) {
  const parsedData = JSON.parse(props.data);

  return (
    <>
      <Products data={parsedData}></Products>
    </>
  );
}

export async function getServerSideProps() {
  async function fetchData() {
    const client = await MongoClient.connect(
      'mongodb+srv://Develop_user:Develop_pass@cluster0.iyq4vsj.mongodb.net/test'
    );
    const database = client.db('clothing-store');
    const collection = database.collection('items');
    const data = await collection.find().toArray();
    client.close();
    return data;
  }

  const data = await fetchData();
  return {
    props: { data: JSON.stringify(data) },
  };
}
