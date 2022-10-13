import * as React from 'react';
import Main from '../src/main/main';

import { MongoClient } from 'mongodb';
const mongodb = require('mongodb');

export default function Index(props) {
  const parsedData = JSON.parse(props.data);

  return (
    <>
      <Main data={parsedData}></Main>
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
    const client = await MongoClient.connect(
      'mongodb+srv://Develop_user:Develop_pass@cluster0.iyq4vsj.mongodb.net/test'
    );
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
