import { Express } from 'express'
import SpotOrders from './../../classes/SpotOrders/SpotOrders'

class BinanceTradesControllers {
  private app: Express | null
  private binance: any
  private baseApiUrl: string

  constructor(app: Express) {
    this.app = app

    this.baseApiUrl = 'https://api.binance.com/api/'

    // this.binance = new Binance().options({
    //   APIKEY:
    //     'zL3wug6SO2RatGr08EjNzDKBSakF3TWeq4uQOOb4nG5DulMlgGKp9IK1RfgG8TVj',
    //   APISECRET:
    //     'ycfOE08IjsP6UxohDUrCSkhPNEuUqW2ee03iIzoNZ0ZXMUnGuEJoDEaojDg805v9',
    // })

    this.getMyTrades()
  }

  getMyTrades() {
    if (this.app) {
      this.app.get('/', (_, res) => {
        // this.binance.trades('SNMBTC', (error, trades, symbol) => {
        //   console.info(symbol + ' trade history', trades)
        // })
        const spotOrders = new SpotOrders()
        spotOrders.parseCsv()
        res.status(200).send('success')
      })
    }
  }
}

export default BinanceTradesControllers
