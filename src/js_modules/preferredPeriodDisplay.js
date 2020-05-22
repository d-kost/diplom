const getPreferredPeriodDisplay = (name, value) => {
  switch (name) {
    case 'Месяц': return getMonthRusName(value);
    case 'Полугодие': return getRomanNumeral(value);
    case 'Квартал': return getRomanNumeral(value);

    default: return value;
  }
}

const getMonthRusName = (month) => {
  let date = new Date(2000, month, 1);
  let monthName = date.toLocaleString("ru", {month: "long"});
  monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return monthName;
}

const getRomanNumeral = (value) => {
  switch (value) {
    case 1: return 'I';
    case 2: return 'II';
    case 3: return 'III';
    case 4: return 'IV';

    default: return value;
  }
}


export default getPreferredPeriodDisplay;