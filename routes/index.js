/**
 * This module defines the routes for the API using Express.
 * It sets up the endpoints for 'status' and 'stats' using the methods
 * from the `AppController` to handle the respective requests.
 */
import AppController from '../controllers/AppController';

const router = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);
};

export default router;
