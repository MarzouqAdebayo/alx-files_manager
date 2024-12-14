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

  static getStats(res) {
    const { nbUsers } = dbClient;
    const { nbFiles } = dbClient;
    res.status(200).json({ users: nbUsers, files: nbFiles });
  }
}
