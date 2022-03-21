const { connect } = require('mongoose');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  connect('mongodb://localhost:27017/payments', dbOptions, () => {
    console.log('Database connected');
  });
};

module.exports = connectDB;
