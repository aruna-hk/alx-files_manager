import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
      this.isClientConnected = false;
    });
  }
  isAlive() {
    return this.isClientConnected;
  }
  async get(key) {
    return new Promise((resolve, reject) => {
    this.client.GET(key, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
     });
   });
  }
  async set(key, value, duration) {
    await this.client.SETEX(key, duration, value);
  }

  async del(key) {
    await this.client.DEL(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
