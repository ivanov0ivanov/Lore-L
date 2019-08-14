export default function separatorNum(value) {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0
  });
  return formatter.format(value);
}
