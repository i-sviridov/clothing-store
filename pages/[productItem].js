const mongodb = require('mongodb');
import { MongoClient } from 'mongodb';
import Navigation from '../src/navigation/navigation';
import SingleProduct from '../src/main/products/single-product/single-product';

export default function ProductItem(props) {
  const parsedData = JSON.parse(props.data);
  return (
    <>
      <Navigation />
      <SingleProduct data={parsedData} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const productId = params.productItem;

  async function fetchData() {
    const client = await MongoClient.connect(
      'mongodb+srv://Develop_user:Develop_pass@cluster0.iyq4vsj.mongodb.net/test'
    );
    const database = client.db('clothing-store');
    const collection = database.collection('items');
    const data = await collection.findOne({
      _id: new mongodb.ObjectID(productId),
    });
    client.close();
    return data;
  }

  const data = await fetchData();
  return {
    props: { data: JSON.stringify(data) },
  };
}
