import mongoose from 'mongoose'

class MongooseService {
  private count = 0
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  }

  constructor() {}

  getMongoose() {
    return mongoose
  }

  connectWithRetry = () => {
    mongoose
      .connect('mongodb://localhost:27017/moonstats', this.mongooseOptions)
      .then(() => {
        console.log('Mongo DB is connected')
      })
      .catch((err) => {
        const retrySeconds = 5
        console.log(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        )
        setTimeout(this.connectWithRetry, retrySeconds * 1000)
      })
  }
}
export default MongooseService
