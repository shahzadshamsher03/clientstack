const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Data = require('./models/Data');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shahzadshamsher06_db_user:shamsher@cluster0.g31p03l.mongodb.net/assignment_db?retryWrites=true&w=majority';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Data.deleteMany();

        // Create Dummy User
        const testUser = await User.create({
            name: 'Test Administrator',
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Created Test User: test@example.com / password123');

        // Create Dummy Data
        const dummyData = [
            { type: 'Lead', title: 'John Doe', description: 'Interested in Pro Plan', status: 'New' },
            { type: 'Lead', title: 'Acme Corp', description: 'Enterprise Inquiry', status: 'Contacted' },
            { type: 'Lead', title: 'Jane Smith', description: 'Needs support', status: 'Active' },
            { type: 'Task', title: 'Follow up with Acme Corp', description: 'Send enterprise pricing details', status: 'Pending' },
            { type: 'Task', title: 'Update Dashboard UI', description: 'Make it neat and attractive', status: 'In Progress' },
            { type: 'Task', title: 'Fix Login Bug', description: 'Validation error on email field', status: 'Completed' },
            { type: 'User', title: 'Alice Williams', description: 'Admin', status: 'Active' },
            { type: 'User', title: 'Bob Johnson', description: 'Editor', status: 'Active' },
            { type: 'User', title: 'Charlie Brown', description: 'Viewer', status: 'Inactive' }
        ];

        await Data.insertMany(dummyData);
        console.log('Inserted Dummy Leads, Tasks, and Users');

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.log('Error seeding database:', error.message);
    }
};

seedDatabase();
