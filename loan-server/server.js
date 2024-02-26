import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import { routeHandler } from './route-handler.js'

dotenv.config()

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5050

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(bodyParser.json())

app.post('/api', (req, res) => {
    res.send('Hello from the API')
})

app.post('/api/:route', async (req, res) => {
    const { route } = req.params
    const response = await routeHandler(route, req)
    res.send(response)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})