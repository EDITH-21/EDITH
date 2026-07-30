const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Task = require('./models/Task');
const Expense = require('./models/Expense');
const Budget = require('./models/Budget');
const Goal = require('./models/Goal');
const Note = require('./models/Note');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/edith_db';

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[EDITH Seed] Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();
    await Expense.deleteMany();
    await Budget.deleteMany();
    await Goal.deleteMany();
    await Note.deleteMany();

    // Create Demo User
    const demoUser = await User.create({
      name: 'Shivam',
      email: 'shivam@edith.ai',
      password: 'password123', // Will be hashed by pre-save middleware
      role: 'admin',
      isVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    });

    console.log(`[EDITH Seed] Created demo user: ${demoUser.email}`);

    // Create Sample Tasks
    await Task.insertMany([
      { user: demoUser._id, title: 'Design new homepage', status: 'To Do', priority: 'High', category: 'Design', dueDate: new Date('2025-05-30'), progress: 0 },
      { user: demoUser._id, title: 'Buy groceries', status: 'To Do', priority: 'Medium', category: 'Personal', dueDate: new Date('2025-05-29'), progress: 0 },
      { user: demoUser._id, title: 'Read 20 pages of book', status: 'To Do', priority: 'Low', category: 'Personal', dueDate: new Date('2025-05-29'), progress: 0 },
      { user: demoUser._id, title: 'Plan marketing strategy', status: 'To Do', priority: 'Medium', category: 'Work', dueDate: new Date('2025-05-31'), progress: 0 },
      { user: demoUser._id, title: 'Project Development', status: 'In Progress', priority: 'High', category: 'Work', dueDate: new Date('2025-06-05'), progress: 60 },
      { user: demoUser._id, title: 'UI/UX Improvements', status: 'In Progress', priority: 'Medium', category: 'Design', dueDate: new Date('2025-06-02'), progress: 80 },
      { user: demoUser._id, title: 'Content Writing', status: 'In Progress', priority: 'Low', category: 'Work', dueDate: new Date('2025-06-04'), progress: 40 },
      { user: demoUser._id, title: 'Budget Review', status: 'Review', priority: 'High', category: 'Finance', dueDate: new Date('2025-05-27'), progress: 90 },
      { user: demoUser._id, title: 'Client Feedback', status: 'Review', priority: 'Medium', category: 'Work', dueDate: new Date('2025-05-27'), progress: 95 },
      { user: demoUser._id, title: 'Team Meeting', status: 'Completed', priority: 'Medium', category: 'Work', dueDate: new Date('2025-05-25'), progress: 100 },
      { user: demoUser._id, title: 'Logo Design', status: 'Completed', priority: 'High', category: 'Design', dueDate: new Date('2025-05-24'), progress: 100 },
      { user: demoUser._id, title: 'Website Testing', status: 'Completed', priority: 'Low', category: 'Work', dueDate: new Date('2025-05-23'), progress: 100 },
      { user: demoUser._id, title: 'Monthly Planning', status: 'Completed', priority: 'Medium', category: 'Work', dueDate: new Date('2025-05-23'), progress: 100 },
    ]);

    console.log('[EDITH Seed] Inserted sample tasks...');

    // Create Sample Expenses
    await Expense.insertMany([
      { user: demoUser._id, title: 'Project Payment', amount: 15000, type: 'Income', category: 'Salary', paymentMethod: 'Net Banking', date: new Date('2025-05-28') },
      { user: demoUser._id, title: 'Zomato Order', amount: 650, type: 'Expense', category: 'Food', paymentMethod: 'UPI', date: new Date('2025-05-28') },
      { user: demoUser._id, title: 'Uber Ride', amount: 320, type: 'Expense', category: 'Transport', paymentMethod: 'UPI', date: new Date('2025-05-27') },
      { user: demoUser._id, title: 'Amazon Purchase', amount: 1250, type: 'Expense', category: 'Shopping', paymentMethod: 'Card', date: new Date('2025-05-26') },
      { user: demoUser._id, title: 'Electricity Bill', amount: 2150, type: 'Expense', category: 'Bills', paymentMethod: 'Net Banking', date: new Date('2025-05-25') },
      { user: demoUser._id, title: 'Netflix Subscription', amount: 649, type: 'Expense', category: 'Entertainment', paymentMethod: 'Card', date: new Date('2025-05-24') },
      { user: demoUser._id, title: 'Gym Membership', amount: 1500, type: 'Expense', category: 'Healthcare', paymentMethod: 'UPI', date: new Date('2025-05-20') },
    ]);

    await Budget.create({
      user: demoUser._id,
      monthlyBudget: 40000,
      month: 'May 2025',
    });

    console.log('[EDITH Seed] Inserted sample expenses and budget...');

    // Create Sample Goals
    await Goal.insertMany([
      { user: demoUser._id, title: 'Learn React 19', targetAmount: 100, currentAmount: 80, progress: 80, category: 'Education' },
      { user: demoUser._id, title: 'Emergency Savings', targetAmount: 100000, currentAmount: 65000, progress: 65, category: 'Finance' },
      { user: demoUser._id, title: 'Fitness Goal (Workouts)', targetAmount: 30, currentAmount: 27, progress: 90, category: 'Health' },
      { user: demoUser._id, title: 'Read 24 Books', targetAmount: 24, currentAmount: 10, progress: 40, category: 'Personal' },
    ]);

    console.log('[EDITH Seed] Inserted sample goals...');

    // Create Sample Notes
    await Note.insertMany([
      { user: demoUser._id, title: 'EDITH Architecture Specs', content: '# EDITH Architecture\n- React 19 Frontend\n- Node Express Backend\n- Mongoose MongoDB', folder: 'Work', pinned: true },
      { user: demoUser._id, title: 'Weekly Sprint Ideas', content: 'Focus on glassmorphic theme and Redux state sync.', folder: 'Work', pinned: false },
      { user: demoUser._id, title: 'Personal Book Recommendations', content: 'Atomic Habits, Deep Work, Psychology of Money.', folder: 'Personal', pinned: false },
    ]);

    console.log('[EDITH Seed] Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[EDITH Seed Error]', error);
    process.exit(1);
  }
};

seedDatabase();
