const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Donald', 'Sandra', 'Mark', 'Ashley', 'Paul', 'Kimberly', 'Steven', 'Emily', 'Andrew', 'Donna', 'Kenneth', 'Michelle', 'Joshua', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Melissa', 'George', 'Deborah', 'Edward', 'Stephanie'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const skillSets = [
    ['React', 'Node.js', 'MongoDB', 'Express'],
    ['Python', 'Django', 'PostgreSQL', 'AWS'],
    ['Java', 'Spring Boot', 'Microservices', 'Docker'],
    ['Angular', 'TypeScript', 'RxJS'],
    ['Vue.js', 'Firebase', 'TailwindCSS'],
    ['C#', '.NET Core', 'Azure', 'SQL Server'],
    ['Flutter', 'Dart', 'Mobile Development'],
    ['DevOps', 'Kubernetes', 'Jenkins', 'Terraform'],
    ['UI/UX', 'Figma', 'Adobe XD', 'Prototyping'],
    ['Data Science', 'Pandas', 'NumPy', 'Machine Learning']
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const importData = async () => {
    try {
        await User.deleteMany({}); // Clear existing users

        const salt = await bcrypt.genSalt(10);
        const defaultPassword = await bcrypt.hash('password123', salt);
        const adminPassword = await bcrypt.hash('admin123', salt);
        const managerPassword = await bcrypt.hash('manager123', salt);

        const users = [];

        // Add CEO
        users.push({
            name: 'CEO Admin',
            email: 'ceo@company.com',
            password: adminPassword,
            role: 'CEO',
            employeeId: 'CEO001',
            skills: ['Leadership', 'Strategy'],
            experience: '20+ years'
        });

        // Add Manager
        users.push({
            name: 'Jane Manager',
            email: 'manager@company.com',
            password: managerPassword,
            role: 'Manager',
            employeeId: 'MGR001',
            skills: ['Management', 'Agile'],
            experience: '10+ years'
        });

        // Generate 200 Employees
        for (let i = 1; i <= 200; i++) {
            const firstName = getRandomElement(firstNames);
            const lastName = getRandomElement(lastNames);
            const skills = getRandomElement(skillSets);
            const experience = `${Math.floor(Math.random() * 10) + 1} years`;

            users.push({
                name: `${firstName} ${lastName}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@company.com`,
                password: defaultPassword,
                role: 'Employee',
                employeeId: `EMP${String(i).padStart(3, '0')}`,
                skills: skills,
                experience: experience
            });
        }

        await User.insertMany(users);

        console.log('✅ Successfully seeded 200+ users!');
        console.log('CEO: ceo@company.com / admin123');
        console.log('Manager: manager@company.com / manager123');
        console.log('Employees password: password123');

        process.exit();
    } catch (error) {
        console.error(`❌ Error with data import: ${error}`);
        process.exit(1);
    }
};

importData();
