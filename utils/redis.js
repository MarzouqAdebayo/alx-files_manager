import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.isConnected = true;

    this.client = createClient();

    this.client.on('error', (err) => {
      this.isConnected = false;
      console.error('Redis Client Error:', err);
    });

    this.client.on('connect', () => {
      this.isConnected = true;
    });
  }

  isAlive() {
    return this.isConnected;
  }

  /**
   * @param key {String}
   * @returns {Promise<any>}
   */
  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  /**
   * @param key {String}
   * @param value {any}
   * @param duration {number}
   * @returns {Promise<any>}
   */
  async set(key, value, duration) {
    return promisify(this.client.setex).bind(this.client)(key, duration, value);
  }

  /**
   * @param key {String}
   * @returns {Promise<void>}
   */
  async del(key) {
    return promisify(this.client.del).bind(this.client)(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
