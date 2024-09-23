const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));


// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://username:password@cluster0.mongodb.net/your_database_name?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('Could not connect to MongoDB...', err));
