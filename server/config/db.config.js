const mongoose = require('mongoose')

const connectToDB = async () => {
  let connect = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })

  console.log(`MongoDB connected successfully!!! `)
}

connectToDB()