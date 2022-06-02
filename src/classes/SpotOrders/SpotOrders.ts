import { PNL, SpotOrderRow } from './../../../spotOrderTypes'
import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'

class SpotOrders {
  pnlList: PNL = {}

  constructor() {}

  parseCsv() {
    const self = this

    // only parse those in /src/csv/current
    const folder: string = 'src/csv/current'

    // Loop through all the files in the directory
    fs.readdir(folder, function (err, files) {
      if (err) {
        console.error('Could not list the directory.', err)
        process.exit(1)
      }

      files.forEach(function (file, index) {
        var fromPath = path.join(folder, file)

        fs.createReadStream(fromPath)
          .pipe(csv.parse({ headers: true }))
          .on('error', (error) => console.error(error))
          .on('data', (row: SpotOrderRow) => {
            self.parseRow(row)
          })
          .on('end', async (rowCount: number) => {
            console.log(`Parsed ${rowCount} rows`, { index })
            // console.log({ orders: JSON.stringify(self.pnlList) })
          })
      })
    })
  }

  parseRow(row: SpotOrderRow) {
    if (row['Date(UTC)']) {
      // const expense: string = row['Date(UTC)']
      if (this.pnlList && this.pnlList[row['Market']]) {
        console.log('push', row['Market'])
        this.pnlList[row['Market']].push({
          type: row.Type,
          date: row['Date(UTC)'],
          price: row.Price,
          amount: row.Amount,
          total: row.Total,
          fee: row.Fee,
          feeCoin: row['Fee Coin'],
        })
      } else {
        console.log('new', row['Market'])
        this.pnlList[row['Market']] = [
          {
            type: row.Type,
            date: row['Date(UTC)'],
            price: row.Price,
            amount: row.Amount,
            total: row.Total,
            fee: row.Fee,
            feeCoin: row['Fee Coin'],
          },
        ]
      }
    }
  }
}

export default SpotOrders
