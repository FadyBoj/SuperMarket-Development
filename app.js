require('express-async-errors');

const express = require('express');
const app = express();
const ConnectDB = require('./db/connect');
const path = require('path');

const http = require('http').createServer(app)
const io = require('socket.io')(http);

io.on('connection',socket=>{
    socket.on('orderAdded',msg=>{
        socket.broadcast.emit('orderAdded','NULL');
    })
})

// products route
const productsApi = require('./routes/api-products-route');
const users = require('./routes/users-route');
const admin = require('./routes/admin-route');
const products = require('./routes/products-route');
require('dotenv').config();

//middleware setup
const session = require('express-session')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const passportMiddleware = require('./middleware/passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const homeAuth = require('./middleware/home-auth');


app.set('view engine','ejs');

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended:false,
    limit:'200mb'
}))

app.use(bodyParser.json())

app.use(passportMiddleware.initialize());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.static('public'))

//routes 
app.use('/products',products)
app.use('/api/products',productsApi);
app.use('/',users); 
app.use('/admin',admin);

const port = process.env.port || 3000;

app.get('/',homeAuth,(req,res) =>{

    res.status(200).render(path.join(__dirname,'public','homePage.ejs'),{req:req});
})



app.use(errorHandlerMiddleware);    
app.use(notFoundMiddleware);
const Start = async () =>{
    try {
        await ConnectDB(process.env.MONGO_URI);

        http.listen(port,()=>{
            console.log(`Server is Running on port ${port}...`);
        })
        
    } catch (error) {
        console.log(error);
    }
    
}

Start();