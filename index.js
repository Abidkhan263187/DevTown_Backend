const express = require('express');
const { connection } = require('./config/db');
const { productRoute } = require('./Routes/ProductRoute');
const cors=require('cors')

const app = express();

app.use(cors({
    origin: '*'
}))

app.use(express.json())

app.use('/', productRoute)

const port=process.env.PORT
app.listen(port, async () => {
    try {
        await connection
        console.log('connection established')
        console.log("server listening on",port)
    } catch (error) {
        console.log(error, "error in connection")
    }
   
})