import dbClient from '../utils/db';
import redisClient from '../utils/redis';

export default class AppController {
  static getStatus(res) {
    const isRedisAlive = redisClient.isAlive();
    const isDBAlive = dbClient.isAlive();
    res.status(200).json({
      redis: isRedisAlive,
      db: isDBAlive,
    });
  }

  static async getStats(res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    res.status(200).json({ users: nbUsers, files: nbFiles });
  }
}
