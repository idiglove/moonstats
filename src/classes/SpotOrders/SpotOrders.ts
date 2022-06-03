import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'
import { SuccessResponse } from './../../../types.d'
import { SpotOrderType } from './../../../spotOrderTypes.d'
import { SpotOrderPNL, SpotOrderRow } from './../../../spotOrderTypes'
import { SpotOrderModel } from './../../schema/spotOrder'

class SpotOrders {
  pnlList: SpotOrderPNL = {}

  constructor() {}

  parseCsv(parseEndCallback: (success: SuccessResponse) => void) {
    const self = this

    // only parse those in /src/csv/current
    const folder: string = 'src/csv/current'

    // Loop through all the files in the directory
    fs.readdir(folder, function (err, files) {
      if (err) {
        console.error('Could not list the directory.', err)
        process.exit(1)
      }

      const parseError: SuccessResponse = {
        success: true,
        message: 'Success parsing',
      }

      files.forEach(function (file, index) {
        var fromPath = path.join(folder, file)

        fs.createReadStream(fromPath)
          .pipe(csv.parse({ headers: true }))
          .on('error', (error) => {
            parseError.success = false
            parseError.message = 'There is an error: ' + error.message
            parseEndCallback(parseError)
          })
          .on('data', async (row: SpotOrderRow) => {
            self.parseRow(row)
          })
          .on('end', async (rowCount: number) => {
            console.log(`Parsed ${rowCount} rows`, { index })
            parseEndCallback(parseError)
            // console.log({ orders: JSON.stringify(self.pnlList) })
          })
      })
    })
  }

  async parseRow(row: SpotOrderRow) {
    if (row['Date(UTC)']) {
      const isInserted = await this.hasBeenInserted(row)
      if (!isInserted) {
        await this.insertRow({
          market: row.Market,
          type: row.Type,
          date: row['Date(UTC)'],
          price: row.Price,
          amount: row.Amount,
          total: row.Total,
          fee: row.Fee,
          feeCoin: row['Fee Coin'],
        })
      }
    }
  }

  async insertRow(spotOrder: SpotOrderType) {
    await SpotOrderModel.create(spotOrder)
  }

  async hasBeenInserted(spotOrderRow: SpotOrderRow) {
    const order = await SpotOrderModel.findOne({
      market: spotOrderRow.Market,
      type: spotOrderRow.Type,
      date: spotOrderRow['Date(UTC)'],
      total: spotOrderRow.Total,
    }).exec()

    if (order) {
      return true
    }

    return false
  }
}

export default SpotOrders
