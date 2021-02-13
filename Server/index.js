const  express = require('express')
const mongoose =  require('mongoose') 
const bodyParser = require('body-parser')

const app = express()
 
// const url = 'mongodb+srv://root:RdRXotePjJwKcv6u@cluster0.eyhy3.mongodb.net/thrift_store?retryWrites=true&w=majority'

const url = 'mongodb://localhost/thrift_store'

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// first request
app.get('/', (req, res) => {
    res.json({
        "message": "Thrift Store"
    });
});


// routes

require('./app/Routes/category.routes')(app)
require('./app/Routes/user.routes')(app)
require('./app/Routes/Admin/user.routes')(app)

app.listen(9000, () => {
    console.log('Server started')
})