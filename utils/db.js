import { MongoClient } from 'mongodb';
import { configDotenv } from 'dotenv';

/**
 * MongoDB client
 */
class DBClient {
  /**
   * Creates DBClient instance
   */
  constructor() {
    configDotenv();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect();
    this.isConnected = false;
    this.connect();
  }

  /**
   * Connects to the MongoDB server.
   * Sets the database reference and updates the connection status.
   */
  async connect() {
    try {
      this.db = this.client.db(this.database);
      this.isConnected = true;
    } catch (err) {
      this.isConnected = false;
    }
  }

  /**
   * Checks if the connection to the MongoDB server is alive.
   * @returns {boolean} - Returns true if connected, flase otherwise.
   */
  isAlive() {
    return this.isConnected;
  }

  /**
   * Retrieves the number of documents in the 'users' collection.
   * @returns {Promise<number>} - A promise that resolves to the count of documents.
   */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  /**
   * Retrieves the number of documents in the 'files' collection.
   * @returns {Promise<number>} - A promise that resolves to the count of documents.
   */
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  async usersCollection() {
    return this.db.collection('users');
  }

  /**
   * Gets the 'files' collection  from the connected database.
   * @returns {Promise<Collection>} - A promise that resolves to the 'files' colection.
   */
  async filesCollection() {
    return this.db.collection('files');
  }
}

const dbClient = new DBClient();
export default dbClient;
