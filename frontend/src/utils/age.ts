export function getAge(birthDayDate: Date) {
  const currentDate = new Date();

  const currentAge = currentDate.getFullYear() - birthDayDate.getFullYear();
  return currentAge.toString();
}
