import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

mongoose.set('strictQuery', true)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT })
})

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`)
})
