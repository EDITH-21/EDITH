const Task = require('../models/Task');
const Expense = require('../models/Expense');
const Goal = require('../models/Goal');

exports.getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'Completed' });
    const tasksInProgress = await Task.countDocuments({ user: userId, status: 'In Progress' });
    const pendingTasks = await Task.countDocuments({ user: userId, status: 'To Do' });

    const expenses = await Expense.find({ user: userId });
    const totalExpenses = expenses
      .filter((e) => e.type === 'Expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalIncome = expenses
      .filter((e) => e.type === 'Income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const goals = await Goal.find({ user: userId });
    const avgGoalProgress = goals.length
      ? Math.round(goals.reduce((acc, g) => acc + (g.progress || 0), 0) / goals.length)
      : 75;

    const productivityScore = Math.min(100, Math.round((completedTasks / (totalTasks || 1)) * 100 + 10));

    res.status(200).json({
      success: true,
      data: {
        productivityScore,
        taskStats: {
          total: totalTasks,
          completed: completedTasks,
          inProgress: tasksInProgress,
          pending: pendingTasks,
          completionRate: Math.round((completedTasks / (totalTasks || 1)) * 100),
        },
        financialStats: {
          totalIncome,
          totalExpenses,
          savings: totalIncome - totalExpenses,
        },
        goalStats: {
          totalGoals: goals.length,
          avgProgress: avgGoalProgress,
        },
        weeklyActivity: [
          { day: 'Mon', tasks: 4, focusHours: 3.5, spent: 1200 },
          { day: 'Tue', tasks: 6, focusHours: 5.0, spent: 450 },
          { day: 'Wed', tasks: 5, focusHours: 4.2, spent: 3200 },
          { day: 'Thu', tasks: 8, focusHours: 6.1, spent: 890 },
          { day: 'Fri', tasks: 7, focusHours: 5.5, spent: 1500 },
          { day: 'Sat', tasks: 3, focusHours: 2.0, spent: 4500 },
          { day: 'Sun', tasks: 2, focusHours: 1.5, spent: 800 },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};
