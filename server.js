import express from 'express';
import { configDotenv } from 'dotenv';
import router from './routes';

configDotenv();

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

router(app);

export default app;
