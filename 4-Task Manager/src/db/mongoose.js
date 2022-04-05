const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,  // Not Supported
    // useFindAndModify: false // Not Supported

});
