import express from 'express';
import { ENV } from './src/config/env.js';

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(ENV.PORT, () => {
  console.log(`http://localhost:${ENV.PORT}`);
});