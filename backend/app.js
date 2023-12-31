const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')
const cookieSession = require('cookie-session')
const passportSetup = require("./passport")
const authRoute = require("./routes/auth")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cookieSession({
        name:"session",
        keys:["itp"],
        maxAge:24*60*60*100,
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "https://sl-car-sale.vercel.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url,{});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connection successfully");
});
app.use("/auth",authRoute);
const user = require('./routes/user.js');
app.use('/user', user);

const userDashboard = require('./routes/user.dashboard.js');
app.use('/userDashboard', userDashboard);

const feedback = require('./routes/user.feedback.js');
app.use('/feedback', feedback);

const employee = require('./routes/user.employee.profile.js');
app.use('/employee', employee);

const vehicle_category = require('./routes/vehicle_category.js');
app.use('/vehicle_category', vehicle_category);

const vehicle_subcategory = require('./routes/vehicle.subcategory.js');
app.use('/vehicle_subcategory', vehicle_subcategory);

const vehicle_add = require('./routes/vehicle.add.js');
app.use('/vehicle_add', vehicle_add);

const vehicle_import = require('./routes/vehicle.import.js');
app.use('/vehicle_import', vehicle_import);

const service_Center = require('./routes/maintance.service.center.js');
app.use('/service_Center', service_Center);

const advertisement = require('./routes/advertisement.js');
app.use('/advertisement', advertisement);

const serviceBooking = require('./routes/service.Booking.js');
app.use('/serviceBooking', serviceBooking);

const payment = require('./routes/payment.js');
app.use('/payment', payment);

const employeeAnalisis = require('./routes/employee.js');
app.use('/employeeAnalisis', employeeAnalisis);

app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});