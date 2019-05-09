const express = require('express')   
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//body-parser middleware
app.use(bodyParser.json())

//connect mongodb
mongoose.connect("mongoURI:'mongodb://localhost/clothes_shop_db'", { useNewUrlParser: true })
        .then(() => console.log("MongoDB was connected..."))
        .catch(err => console.log(err))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server was start at port ${port}`))