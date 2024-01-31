import './db/db.connect.mjs'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'

import { itemRouter } from './routes/item.router.mjs'
import { saleRouter } from './routes/sale.router.mjs'

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1', itemRouter)
app.use('/api/v1', saleRouter)

app.use('/', (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong.' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server initialized');
});
