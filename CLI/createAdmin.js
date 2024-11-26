const mongoose = require('mongoose');
const User = require('../models/user');
const { connectDB } = require('../db/db');
const bcrypt = require('bcryptjs');

const createAdminAccount = async () => {
    let password = "admin";
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await connectDB();
        const adminUser = new User({
            email: 'admin@hkmu.com',
            username: 'admin',
            password: hashedPassword,
            phone: 23791042,
            hkid: 'A123456(7)',
            role: 'admin',
        });

        await adminUser.save();
        console.log('Admin account created successfully!', adminUser);

    } catch (error) {
        console.error('Error creating admin account:', error);
    } finally {
        mongoose.connection.close();
    }
}; 

createAdminAccount();