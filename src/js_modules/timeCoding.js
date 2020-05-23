export const getId = (year, month, duration) => {
  return 12*getIntervalStart(year, month) + 12 - duration;
}

const getIntervalStart = (year, month) => {
  return (year * 12) + month;
}