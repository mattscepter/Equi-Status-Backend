require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const fileupload = require('express-fileupload');
// const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use(fileupload({useTempFiles: true}))
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/equipmentRouter'));

const port = 5000;
app.listen(port, () => {
  console.log('server up and running on PORT :', port);
});
