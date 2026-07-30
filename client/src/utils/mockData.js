export const initialUser = {
  id: 'user_123',
  name: 'Shivam',
  email: 'shivam@edith.ai',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
};

export const initialTasks = [
  { id: 't1', title: 'Design new homepage', description: 'Create responsive hero layout in Figma', status: 'To Do', priority: 'High', category: 'Design', dueDate: '2025-05-30', progress: 0, labels: ['Design', 'UI'] },
  { id: 't2', title: 'Buy groceries', description: 'Fresh vegetables and fruits', status: 'To Do', priority: 'Medium', category: 'Personal', dueDate: '2025-05-29', progress: 0, labels: ['Personal'] },
  { id: 't3', title: 'Read 20 pages of book', description: 'Atomic Habits Chapter 4', status: 'To Do', priority: 'Low', category: 'Personal', dueDate: '2025-05-29', progress: 0, labels: ['Personal'] },
  { id: 't4', title: 'Plan marketing strategy', description: 'Q3 campaign outline', status: 'To Do', priority: 'Medium', category: 'Work', dueDate: '2025-05-31', progress: 0, labels: ['Work'] },
  { id: 't5', title: 'Call with client', description: 'Review roadmap & milestones', status: 'To Do', priority: 'High', category: 'Work', dueDate: '2025-06-01', progress: 0, labels: ['Work'] },

  { id: 't6', title: 'Project Development', description: 'Implement Redux slices & Express routes', status: 'In Progress', priority: 'High', category: 'Work', dueDate: '2025-06-05', progress: 60, labels: ['Work', 'Code'] },
  { id: 't7', title: 'UI/UX Improvements', description: 'Refine glassmorphism cards & animations', status: 'In Progress', priority: 'Medium', category: 'Design', dueDate: '2025-06-02', progress: 80, labels: ['Design'] },
  { id: 't8', title: 'Content Writing', description: 'Draft blog post for launch', status: 'In Progress', priority: 'Low', category: 'Work', dueDate: '2025-06-04', progress: 40, labels: ['Work'] },

  { id: 't9', title: 'Budget Review', description: 'Quarterly financial forecast check', status: 'Review', priority: 'High', category: 'Finance', dueDate: '2025-05-27', progress: 90, labels: ['Finance'] },
  { id: 't10', title: 'Client Feedback', description: 'Incorporate revision requests', status: 'Review', priority: 'Medium', category: 'Work', dueDate: '2025-05-27', progress: 95, labels: ['Work'] },

  { id: 't11', title: 'Team Meeting', description: 'Weekly standup & progress sync', status: 'Completed', priority: 'Medium', category: 'Work', dueDate: '2025-05-25', progress: 100, labels: ['Work'] },
  { id: 't12', title: 'Logo Design', description: 'Create EDITH letter E glowing emblem', status: 'Completed', priority: 'High', category: 'Design', dueDate: '2025-05-24', progress: 100, labels: ['Design'] },
  { id: 't13', title: 'Website Testing', description: 'Cross-browser testing on Chrome & Safari', status: 'Completed', priority: 'Low', category: 'Work', dueDate: '2025-05-23', progress: 100, labels: ['Work'] },
  { id: 't14', title: 'Monthly Planning', description: 'Goal setting for May 2025', status: 'Completed', priority: 'Medium', category: 'Work', dueDate: '2025-05-23', progress: 100, labels: ['Work'] },
];

export const initialExpenses = [
  { id: 'e1', title: 'Project Payment', amount: 15000, type: 'Income', category: 'Salary', paymentMethod: 'Net Banking', date: '2025-05-28' },
  { id: 'e2', title: 'Zomato Order', amount: 650, type: 'Expense', category: 'Food & Dining', paymentMethod: 'UPI', date: '2025-05-28' },
  { id: 'e3', title: 'Uber Ride', amount: 320, type: 'Expense', category: 'Transport', paymentMethod: 'UPI', date: '2025-05-27' },
  { id: 'e4', title: 'Amazon Purchase', amount: 1250, type: 'Expense', category: 'Shopping', paymentMethod: 'Card', date: '2025-05-26' },
  { id: 'e5', title: 'Electricity Bill', amount: 2150, type: 'Expense', category: 'Bills & Utilities', paymentMethod: 'Net Banking', date: '2025-05-25' },
  { id: 'e6', title: 'Netflix Subscription', amount: 649, type: 'Expense', category: 'Entertainment', paymentMethod: 'Card', date: '2025-05-24' },
];

export const expenseSummaryData = {
  totalIncome: 40000,
  totalExpenses: 24850,
  savings: 15150,
  budget: 30000,
  spendingTrend: [
    { date: '1 May', amount: 1200 },
    { date: '7 May', amount: 2100 },
    { date: '13 May', amount: 3800 },
    { date: '19 May', amount: 6850 },
    { date: '25 May', amount: 4900 },
    { date: '31 May', amount: 5990 },
  ],
  categoryBreakdown: [
    { name: 'Food & Dining', amount: 7250, percentage: 29, color: '#ef4444' },
    { name: 'Transport', amount: 4850, percentage: 19, color: '#f97316' },
    { name: 'Shopping', amount: 4200, percentage: 17, color: '#f59e0b' },
    { name: 'Bills & Utilities', amount: 3650, percentage: 15, color: '#3b82f6' },
    { name: 'Entertainment', amount: 2400, percentage: 10, color: '#8b5cf6' },
    { name: 'Health', amount: 1200, percentage: 5, color: '#06b6d4' },
    { name: 'Others', amount: 1300, percentage: 5, color: '#64748b' },
  ],
};

export const initialGoals = [
  { id: 'g1', title: 'Learn React 19', targetAmount: 100, currentAmount: 80, progress: 80, color: '#ef4444' },
  { id: 'g2', title: 'Save ₹1,00,000', targetAmount: 100000, currentAmount: 65000, progress: 65, color: '#f59e0b' },
  { id: 'g3', title: 'Fitness Goals', targetAmount: 30, currentAmount: 27, progress: 90, color: '#3b82f6' },
  { id: 'g4', title: 'Read 24 Books', targetAmount: 24, currentAmount: 10, progress: 40, color: '#10b981' },
];

export const initialNotes = [
  { id: 'n1', title: 'EDITH Product Roadmap', content: '# EDITH Roadmap\n- Frontend: React 19 + Redux Toolkit + Tailwind CSS\n- Backend: Express Node.js + Mongoose\n- AI: Dedicated HUD assistant ready for Gemini/OpenAI API', folder: 'Work', pinned: true, updatedAt: '2025-05-28' },
  { id: 'n2', title: 'Weekly Sprint Notes', content: 'Ensure all glassmorphic cards have glowing crimson borders. Test mobile drawer responsiveness.', folder: 'Work', pinned: false, updatedAt: '2025-05-27' },
  { id: 'n3', title: 'Personal Goals & Reading', content: '1. Read Deep Work\n2. Exercise 45 mins daily\n3. Review monthly budget', folder: 'Personal', pinned: true, updatedAt: '2025-05-25' },
];

export const scheduleItems = [
  { id: 's1', time: '09:00 AM', title: 'Team Standup', completed: true },
  { id: 's2', time: '10:30 AM', title: 'Project Development', completed: true },
  { id: 's3', time: '01:00 PM', title: 'Lunch Break', completed: true },
  { id: 's4', time: '02:00 PM', title: 'UI/UX Review', completed: false },
  { id: 's5', time: '04:30 PM', title: 'Gym & Fitness', completed: false },
];
