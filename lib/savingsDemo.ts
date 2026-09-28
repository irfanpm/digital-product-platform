/** Frontend illustration only. Never writes to the workbook or purchase system. */
export const EXPENSES = [
  { name: 'Rent', amount: 12000, note: 'A place to call home', icon: 'home' },
  { name: 'Food & dining', amount: 6800, note: 'The everyday essentials', icon: 'food' },
  { name: 'Shopping', amount: 4500, note: 'A little here, a little there', icon: 'bag' },
  { name: 'EMI', amount: 8000, note: 'Commitments to keep', icon: 'car' },
  { name: 'UPI / other', amount: 13400, note: 'Everything in between', icon: 'phone' },
] as const;

export const inr = (value: number, decimals = 0) => new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', minimumFractionDigits: decimals, maximumFractionDigits: decimals,
}).format(value);

export function storyBalance(progress: number) {
  const steps = Math.min(1, Math.max(0, progress)) * EXPENSES.length;
  return 50000 - EXPENSES.reduce((spent, expense, index) => spent + expense.amount * Math.min(1, Math.max(0, steps - index)), 0);
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function dayNumber(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return NaN;
  return date.getTime() / 86400000;
}

export function calculateSavings(goal: number, saved: number, targetDate: string, today: string) {
  if (!Number.isFinite(goal) || goal <= 0 || goal > 1e10) return { error: 'Enter a goal greater than zero and no more than ₹1,000 crore.' } as const;
  if (!Number.isFinite(saved) || saved < 0 || saved > 1e10) return { error: 'Enter a valid, non-negative amount already saved.' } as const;
  const days = dayNumber(targetDate) - dayNumber(today) + 1;
  if (!Number.isFinite(days) || days < 1) return { error: 'Choose today or a future target date.' } as const;
  const remaining = Math.max(0, goal - saved);
  return { remaining, days, daily: remaining / days, progress: Math.min(100, saved / goal * 100), error: null } as const;
}

export function carryForward(base: number, actual: number) {
  const unpaid = Math.max(0, Math.round((base - actual) * 100) / 100);
  return { unpaid, next: Math.round((base + unpaid) * 100) / 100 };
}
