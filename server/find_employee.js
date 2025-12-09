const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const findEmployee = async () => {
    try {
        const user = await User.findOne({ role: 'Employee' });
        if (user) {
            console.log(`VALID_EMPLOYEE_EMAIL:${user.email}`);
        } else {
            console.log('No employee found');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

findEmployee();
