import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://Develop_user:Develop_pass@cluster0.iyq4vsj.mongodb.net/'
  );

  return client;
}
