import express from 'express'
import spotOrderRoute from './src/routes/spotOrder'

// import BinanceTradesControllers from './src/routes/spotOrder'
import MongooseService from './src/services/mongoose'

const app = express()
const port = 3009
const router = express.Router()

const mongooseService = new MongooseService()

if (!mongooseService.getMongoose().connection.readyState) {
  mongooseService.connectWithRetry()
}

app.use('/', spotOrderRoute())
// const binanceTrades = new BinanceTradesControllers(app)
// app.get('/', (_, res) => {
//   res.status(200).send()
// })

app.listen(port, () => console.log(`Running on port ${port}`))
