
require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();
const routes = require('./routes')

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(4000, () => console.log("listening at localhost: 4000"));




