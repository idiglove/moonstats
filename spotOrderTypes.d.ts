export type SpotOrderRow = {
  'Date(UTC)': string
  Market: string
  Type: string
  Price: string
  Amount: string
  Total: string
  Fee: string
  'Fee Coin': string
}

export type SpotOrderPNL = {
  [key: string]: Array<SpotOrderType>
}

export type SpotOrderType = {
  market?: string
  type: string
  date: string
  price: string
  amount: string
  total: string
  fee: string
  feeCoin: string
}
