export const notNull = <T>(value: T | null): value is T =>
  value !== null && value !== undefined && value !== "";

// make one digit to two digits (1 to 01)
export const toDoubleDigits = (num: number): string => {
  num += 1;
  return num < 10 ? "0" + num : num.toString();
};

export const dateDoubleDigits = (date: number): string => {
  return date < 10 ? "0" + date : date.toString();
};
