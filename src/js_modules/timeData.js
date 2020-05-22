export const periodList = [
  {
    ID: 0,
    Name: 'Год'
  },
  {
    ID: 1,
    Name: 'Полугодие'
  },
  {
    ID: 2,
    Name: 'Квартал'
  },
  {
    ID: 3,
    Name: 'Месяц'
  },
]

export const periodValue = {
  0: {
    min: 2000,
    max: 2030
  },
  1: {
    min: 1,
    max: 2
  },
  2: {
    min: 1,
    max: 4
  },
  3: {
    min: 0,
    max: 11
  },
}

export const getPeriodById = (id) => {
  return periodList.find(period => period.ID === id);
}

const periodId = 0;

export const initialTime = {
  periodId: periodId,
  checkboxVals: [periodId],
  yearFrom: periodValue[periodId].min,
  yearTo: periodValue[periodId].min,
  chosenPeriodFrom: 0,
  chosenPeriodTo: 0
}