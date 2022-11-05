import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcryptjs';

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.iyq4vsj.mongodb.net/${process.env.mongodb_database}`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(connectionString);

  return client;
}

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
