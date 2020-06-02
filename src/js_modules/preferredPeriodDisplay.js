const getPreferredPeriodDisplay = (name, value) => {
  switch (name) {
    case 'Месяц': return getMonthRusName(value);
    case 'Полугодие': return getRomanNumeral(value, name);
    case 'Квартал': return getRomanNumeral(value, name);
    case 'Год': return `${value} ${name}`;

    default: return value;
  }
}

const getMonthRusName = (month) => {
  let date = new Date(2000, month, 1);
  let monthName = date.toLocaleString("ru", {month: "long"});
  monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  return monthName;
}

const getRomanNumeral = (value, name) => {
  value = parseInt(value);
  switch (value) {
    case 1: return 'I ' + name;
    case 2: return 'II ' + name;
    case 3: return 'III ' + name;
    case 4: return 'IV ' + name;

    default: return value;
  }
}


export default getPreferredPeriodDisplay;