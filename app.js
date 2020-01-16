import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Conection to DB
const mongoose = require('mongoose');
// connection de MongoAtlas
// const uri = "mongodb+srv://crr257:jllbRiwSlM9rdj3x@mevn-sjvpx.mongodb.net/mevn?retryWrites=true&w=majority";
const uri = 'mongodb://localhost:27017/mevn'; //local connection

const options = {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
};
mongoose.connect(uri, options).then(
  () => { console.log('connected to mongoDB') },
  err => { console.log('error to connect to mongoDB') }
);

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Rutas (now we are sing a static route(express.static))
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
//app.use('/data', require('./routes/data'));
app.use('/api', require('./routes/data'));
// app.use('/', indexRouter);
// app.use('/user', usersRouter);
app.use('/login', require('./routes/login'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('App listening on port'+ app.get('port'));
});
