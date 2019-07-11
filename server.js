const express = require('express')   
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const multer = require('multer');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express()
app.use(express.json()) // for parsing application/json
app.use(cookieParser()) //cookie-parser dùng để đọc cookies của request:
// app.use(cors({
//     origin: 'http://localhost:7000', //Chan tat ca cac domain khac ngoai domain nay
//     credentials: true //Để bật cookie HTTP qua CORS
// }))

//body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
})); 
//connect mongodb
mongoose.connect("mongodb://thucthuc:T123456@ds341557.mlab.com:41557/clothes_shop_db", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => console.log("MongoDB was connected..."))
        .catch(err => console.log(err))

//access header
app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
});
//end access header

/*call to Route.js*/
const tbSchema = require("./Route/Route");
app.use('/', tbSchema);
app.use('/images', express.static('images'))
/*end: call to routers.js*/

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server was start at port ${port}`))