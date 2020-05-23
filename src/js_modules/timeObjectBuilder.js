import * as timeData from './timeData';

export const getChosenTimeObject = (chosenTimeValue) => {

  let periodId = chosenTimeValue.periodId;
  //checkbox contains nested level ids
  let checkbox = chosenTimeValue.checkboxVals.filter(value => value > periodId).sort();

  let level = getLevel(chosenTimeValue, periodId, checkbox);
  console.log('getChosenTimeObject', level);
  return level;

}


const getLevel = (chosenTimeValue, id, checkboxVals) => {
  let result = [];

  let yearFrom = chosenTimeValue.yearFrom;
  let yearTo = chosenTimeValue.yearTo;

  for (let year = yearFrom; year <= yearTo; year++) {
    //id === 0 is year
    if (id === 0) {
      let timeObject = createTimeObject(id, year);

      if (checkboxVals.length > 0) {
        let [nextId, checkbox] = extractNextId(checkboxVals);

        let limits = getPeriodLimits(id, nextId);
        timeObject.Children = periodLevel(nextId, checkbox, year, limits);
      }

      result.push(timeObject);

    } else {

      let periodFrom = chosenTimeValue.chosenPeriodFrom;
      let periodTo = chosenTimeValue.chosenPeriodTo;

      result.push(...periodLevel(id, checkboxVals, year, [periodFrom, periodTo]));

    }
  }
  return result;
}


const extractNextId = (checkboxVals) => {
  let checkbox = checkboxVals.slice();
  let nextId = checkbox.shift();
  return [nextId, checkbox];
}


const periodLevel = (id, checkboxVals, year, limits) => {
  let result = [];

  for (let period = limits[0]; period <= limits[1]; period++) {
    let timeObject = createTimeObject(id, period);

    if (checkboxVals.length > 0) {
      let [nextId, checkbox] = extractNextId(checkboxVals);

      let limits = getPeriodLimits(id, nextId, period);
      timeObject.Children = periodLevel(nextId, checkbox, year, limits);
    }

    result.push(timeObject);
  }
  return result;
}


const createTimeObject = (id, period) => {
  let timeObject = {};
  timeObject.ID = id; //по формуле

  let periodName = timeData.getPeriodById(id).Name;
  timeObject.Name = `${period} ${periodName}`;

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