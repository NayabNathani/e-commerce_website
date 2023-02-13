const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected!')).catch((e) => {console.log('not connected')});