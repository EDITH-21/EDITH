export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const exportExpensesToCSV = (expenses) => {
  const headers = ['Date', 'Description', 'Category', 'Payment Method', 'Amount', 'Type'];
  const rows = expenses.map((e) => [
    e.date,
    `"${e.title.replace(/"/g, '""')}"`,
    e.category,
    e.paymentMethod || 'N/A',
    e.amount,
    e.type,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `EDITH_Expenses_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
