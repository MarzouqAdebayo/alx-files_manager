import AppController from '../controllers/AppController';
import app from '../server';

app.get('/status', AppController.getStatus);
app.get('/stats', AppController.getStats);
