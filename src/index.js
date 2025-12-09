require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const guideRoute = require('./routes/guide.route')
const touristRoute = require('./routes/tourist.route')
const provinceRoute = require('./routes/province.route')
const tripRoute = require('./routes/trip.route')
const bookingRoute = require('./routes/booking.route')

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/guides", guideRoute);
app.use("/tourists", touristRoute);
app.use("/provinces", provinceRoute);
app.use("/trips", tripRoute);
app.use('/bookings', bookingRoute)

app.get('/', (req, res) => {
  res.send('Welcome to the Guide Booking API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});