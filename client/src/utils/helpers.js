export const formatCurrency = (amount, currencyCode = 'INR') => {
  const num = Number(amount) || 0;
  const currencyMap = {
    INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
    USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
    EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
    GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
  };

  const config = currencyMap[currencyCode] || currencyMap.INR;

  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 0,
    }).format(num);
  } catch (e) {
    return `${config.symbol}${num.toLocaleString()}`;
  }
};

export const getCurrencySymbol = (currencyCode = 'INR') => {
  const map = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
  return map[currencyCode] || '₹';
};

export const exportExpensesToCSV = (expenses) => {
  if (!expenses || expenses.length === 0) return;
  const headers = ['Date', 'Expense Name', 'Category', 'Note', 'Amount'];
  const rows = expenses.map((e) => [
    e.date,
    `"${(e.title || '').replace(/"/g, '""')}"`,
    e.category || 'Other',
    `"${(e.note || '').replace(/"/g, '""')}"`,
    e.amount,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `EDITH_Expenses_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
