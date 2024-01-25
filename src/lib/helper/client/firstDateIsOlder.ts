export const firstDateIsOlder = (
  date1: string | Date,
  date2: string | Date
) => {
  if (typeof date1 === "string") {
    date1 = new Date(date1);
  }
  if (typeof date2 === "string") {
    date2 = new Date(date2);
  }

  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);

  return date1.getTime() < date2.getTime();
};
