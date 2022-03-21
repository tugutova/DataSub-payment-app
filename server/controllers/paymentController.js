const Payment = require('../db/models/payment');

exports.createPayment = async (req, res) => {
  console.log('Поступил запрос!');
  try {
    const {
      cardNumber, expirationDate, cvv, amount,
    } = req.body;
    const currentDate = new Date();

    const newPayment = await Payment.create({
      cardNumber,
      expirationDate,
      cvv,
      amount,
      date: currentDate,
    });
    console.log(newPayment);

    const payment = await Payment.findOne({ date: currentDate }).populate('_id');
    console.log('payment', payment);
    // eslint-disable-next-line no-underscore-dangle
    const requestId = payment._id.toString();
    const paymentAmount = payment.amount;
    res.json({ requestId, paymentAmount });
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err);
  }
  res.status(200).end();
};
