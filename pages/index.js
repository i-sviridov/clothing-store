import * as React from 'react';
import Main from '../src/main/main';
import Navigation from '../src/navigation/navigation';

import { MongoClient } from 'mongodb';

export default function Index(props) {
  const parsedData = JSON.parse(props.data);
  console.log(parsedData);

  return (
    <>
      <Navigation></Navigation>
      <Main></Main>
      {parsedData.map((element) => (
        <>
          <p>{element.title}</p>
          <img className="test" src={element.imageUrl} />
          <p>{element.price}</p>
          <p>{element.description}</p>
          <p>{element.color}</p>
          {element.sizes.map((size) => {
            return <p>{size}</p>;
          })}
        </>
      ))}
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
