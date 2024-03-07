const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnection = `${process.env.MONGO_CONNECTION.replace('<password>', encodeURIComponent(process.env.MONGO_PASSWORD))}`;

const connectWithRetry = () => {
	mongoose
		.connect(mongoConnection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('MongoDB Database is connected.'))
		.catch((error) => {
			console.error('Failed to connect to MongoDB:', error);
			console.log('Retrying connection in 5 seconds...');
			setTimeout(connectWithRetry, 5000);
			// Retry after 5 seconds
		});
};

connectWithRetry();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
