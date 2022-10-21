const mongodb = require('mongodb');
import { connectToDatabase } from '../lib/auth';
import SingleProduct from '../components/single-product/single-product';

export default function ProductItem(props) {
  const parsedData = JSON.parse(props.data);

  return (
    <>
      <SingleProduct data={parsedData} isFavorite={props.isFavorite} />
    </>
  );
}

export async function getServerSideProps(context) {
  const params = context.params;
  const cookies = context.req.headers.cookie;

  let cookiesData = '';
  if (cookies) {
    cookiesData = cookies.split('=')[0].toString();
  }

  const productId = params.productItem;

  const isFavorite = cookiesData === productId;

  async function fetchData() {
    const client = await connectToDatabase();
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
    props: { data: JSON.stringify(data), isFavorite },
  };
}
