export const initialUser = {
  id: 'user_1',
  name: 'Alex',
  email: 'alex@example.com',
  avatar: '',
};

export const initialTasks = [
  {
    id: 't_1',
    title: 'Review weekly budget & subscriptions',
    description: 'Check bank statement for recurring software charges.',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'High',
    status: 'To Do',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: 't_2',
    title: 'Buy groceries for the week',
    description: 'Vegetables, fruits, milk, and coffee beans.',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'Medium',
    status: 'To Do',
    completed: false,
    createdAt: new Date().toISOString().slice(0, 10),
  },
  {
    id: 't_3',
    title: 'Plan upcoming weekend trip',
    description: 'Book hotel accommodations and plan itinerary.',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    priority: 'Low',
    status: 'Completed',
    completed: true,
    createdAt: new Date().toISOString().slice(0, 10),
  },
];

export const initialExpenses = [
  {
    id: 'e_1',
    title: 'Grocery Store Purchase',
    amount: 1450,
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    note: 'Weekly essentials and snacks',
  },
  {
    id: 'e_2',
    title: 'Metro / Fuel Refill',
    amount: 600,
    category: 'Travel',
    date: new Date().toISOString().slice(0, 10),
    note: 'Commute refill',
  },
  {
    id: 'e_3',
    title: 'Electricity & Utility Bill',
    amount: 2200,
    category: 'Bills',
    date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10),
    note: 'Monthly power bill',
  },
  {
    id: 'e_4',
    title: 'Book Purchase',
    amount: 499,
    category: 'Education',
    date: new Date(Date.now() - 86400000 * 5).toISOString().slice(0, 10),
    note: 'Personal development book',
  },
];
