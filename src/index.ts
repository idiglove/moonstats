import express from 'express'

import BinanceTradesControllers from './controllers/binance/trades'

const app = express()
const port = 3009
const router = express.Router()

const binanceTrades = new BinanceTradesControllers(app)

// app.get('/', (_, res) => {
//   res.status(200).send()
// })

app.listen(port, () => console.log(`Running on port ${port}`))
