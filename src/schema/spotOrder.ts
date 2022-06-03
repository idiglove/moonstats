import { SpotOrderType } from './../../spotOrderTypes.d'
import mongoose, { Schema, Model, Document } from 'mongoose'

type SpotOrderDocument = Document & SpotOrderType

// type RoleInput = {
//   type: SpotOrderDocument['name']
//   description: SpotOrderDocument['description']
// }

const spotOrderSchema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
      default: null,
    },
    market: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
    price: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
    amount: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
    total: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
    fee: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
    feeCoin: {
      type: Schema.Types.String,
      required: true,
      default: null,
    },
  },
  {
    collection: 'spotOrders',
    timestamps: true,
  }
)

const SpotOrderModel: Model<SpotOrderDocument> =
  mongoose.model<SpotOrderDocument>('SpotOrder', spotOrderSchema)

export { SpotOrderModel, SpotOrderDocument }
