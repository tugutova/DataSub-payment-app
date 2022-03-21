const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// DB:
const connectDB = require('./db/dbConnect');

connectDB();

// Импортируем routers
const paymentRouter = require('./routers/paymentRouter');

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', paymentRouter);

app.listen(port, () => {
  console.log(`server started on PORT: ${port}`);
});
