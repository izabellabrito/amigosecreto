const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://', { useNewUrlParser: true, useUnifiedTopology: true });

require('./src/models/Group');
require('./src/models/User');

const routes = require('./src/routes');
app.use('/api', routes);

app.listen(5000);