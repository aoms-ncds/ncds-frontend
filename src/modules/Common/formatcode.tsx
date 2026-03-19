const formatAmount = (value?: number | string) => {
  if (value == null) return '';

  const num = Number(value);
  if (isNaN(num)) return '';

  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
export default formatAmount;
