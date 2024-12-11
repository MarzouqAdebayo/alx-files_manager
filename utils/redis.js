import { createClient } from 'redis';

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
    /*client.ping()
      .then(() => true)
      .catch(() => false);*/
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((_, reject) => {
      this.client.set(key, value, (err) => {
        if (err) reject(err);
	
        this.client.expire(key, duration, (err) => {
          if (err) reject(err);
        });
      });
    });
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
