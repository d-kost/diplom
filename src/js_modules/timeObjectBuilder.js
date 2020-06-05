import * as timeData from './timeData';
import { getId } from './timeCoding';

export const getChosenTimeObject = (chosenTimeValue) => {

  let periodId = chosenTimeValue.periodId;
  //checkbox contains nested level ids
  let checkbox = chosenTimeValue.checkboxVals.filter(value => value > periodId).sort();

  let level = getLevel(chosenTimeValue, periodId, checkbox);
  return level;
}


const getLevel = (chosenTimeValue, id, checkboxVals) => {
  let result = [];

  let yearFrom = chosenTimeValue.yearFrom;
  let yearTo = chosenTimeValue.yearTo;

  for (let year = yearFrom; year <= yearTo; year++) {
    //id === 0 is year
    if (id === 0) {
      let timeObject = createTimeObject(id, year, year);

      if (checkboxVals.length > 0) {
        let [nextId, checkbox] = extractNextId(checkboxVals);

        let limits = getPeriodLimits(id, nextId);
        timeObject.Children = periodLevel(nextId, checkbox, year, limits, 0);
      }

      result.push(timeObject);

    } else {

      let periodFrom = chosenTimeValue.chosenPeriodFrom;
      let periodTo = chosenTimeValue.chosenPeriodTo;

      result.push(...periodLevel(id, checkboxVals, year, [periodFrom, periodTo], 0));

    }
  }
  return result;
}


const extractNextId = (checkboxVals) => {
  let checkbox = checkboxVals.slice();
  let nextId = checkbox.shift();
  return [nextId, checkbox];
}


const periodLevel = (id, checkboxVals, year, limits, level) => {
  let result = [];

  for (let period = limits[0]; period <= limits[1]; period++) {

    let timeObject = createTimeObject(id, period, year, level);

    if (checkboxVals.length > 0) {
      let [nextId, checkbox] = extractNextId(checkboxVals);

      let limits = getPeriodLimits(id, nextId, period);
      timeObject.Children = periodLevel(nextId, checkbox, year, limits, level + 1);
    }

    result.push(timeObject);
  }
  return result;
}


const createTimeObject = (id, period, year, level) => {
  let timeObject = {};
  let periodData = timeData.getPeriodById(id);

  let monthNumber;
  if (id === 0) {
    monthNumber = 0;
  } else if (id === 3) {
    monthNumber = period;
  } else {
    let duration = periodData.duration;
    monthNumber = period * duration - duration;
  }

  timeObject.ID = getId(year, monthNumber, periodData.duration);

  let periodName = periodData.Name;
  timeObject.Name = `${period} ${periodName}`;

  //add year to root if year is not root
  if (level === 0 && id !== 0) {
    timeObject.year = `${year} Год`;
  }

  return timeObject;
}


const getPeriodLimits = (id, nextId, step = 1) => {
  //step == 1 when id belongs to year

  let currentPeriod = timeData.getPeriodById(id);
  let nextPeriod = timeData.getPeriodById(nextId);
  let duration = currentPeriod.duration / nextPeriod.duration;

  let periodMin = timeData.periodValue[nextId].min;
  let from = periodMin + (step - 1) * duration;
  let to = from + duration - 1;

  return [from, to];
}