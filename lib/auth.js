import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcryptjs';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://Develop_user:Develop_pass@cluster0.iyq4vsj.mongodb.net/clothing-store'
  );

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
