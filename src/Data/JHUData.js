import * as Countries from "../Constants/Countries";
import * as CountTypes from "../Constants/CountTypes";
import * as Duration from "../Constants/Duration";

const mapping = {
  [Duration.ONE_MONTH]: 30,
  [Duration.ALL]: "all",
  [Duration.ONE_WEEK]: 7,
};
/* Return a promise object. The resolved value is an object that maps each country to its daily change data. 
The object has the form
{
  [country1]: {
    'cases': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
    'deaths': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
    'recovered': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
  }
  [country2]: ...,
} */
const getHistoricalData = (duration) => {
  return fetch(
    `https://disease.sh/v3/covid-19/historical?lastdays=${mapping[duration]}`
  )
    .then((response) => response.json())
    .then((fetchedData) => {
      const processedData = {};
      for (let datum of fetchedData) {
        const country = datum.country;
        if (!filterList.includes(country)) {
          if (!processedData[country]) {
            processedData[country] = {
              [CountTypes.ACTIVE]: accumulatedToDelta(datum.timeline.cases),
              [CountTypes.DEATHS]: accumulatedToDelta(datum.timeline.deaths),
              [CountTypes.RECOVERED]: accumulatedToDelta(
                datum.timeline.recovered
              ),
            };
          } else {
            mergeDelta(
              processedData[country][CountTypes.ACTIVE],
              accumulatedToDelta(datum.timeline.cases)
            );

            mergeDelta(
              processedData[country][CountTypes.DEATHS],
              accumulatedToDelta(datum.timeline.deaths)
            );

            mergeDelta(
              processedData[country][CountTypes.RECOVERED],
              accumulatedToDelta(datum.timeline.recovered)
            );
          }
        }
      }
      return processedData;
    })
    .then((processedData) =>
      fetch(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=${mapping[duration]}`
      )
        .then((response) => response.json())
        .then((fetchedData) => {
          const worldwideData = {
            [CountTypes.ACTIVE]: accumulatedToDelta(fetchedData.cases),
            [CountTypes.DEATHS]: accumulatedToDelta(fetchedData.deaths),
            [CountTypes.RECOVERED]: accumulatedToDelta(fetchedData.recovered),
          };

          return { [Countries.WORLDWIDE]: worldwideData, ...processedData };
        })
    );
};

/* Given an object with cumulated counts up to each date, calculate and convert to an object mapping each date to the incremental difference
of that day's count relative to the day before. The first day is skipped. ISO formatted date string is used in the returned object.
E.g. {9/1/20: 3, 9/2/20:10, 9/3/20:12} is converted to {2020-09-02:7, 2020-09-03:2} */
const accumulatedToDelta = (originalData) => {
  const delta = {};
  let prevCount = null;
  for (const [currDate, currCount] of Object.entries(originalData)) {
    if (prevCount !== null) {
      delta[toISODateStr(currDate)] = currCount - prevCount;
    }
    prevCount = currCount;
  }
  return delta;
};

const mergeDelta = (delta1, delta2) => {
  for (const date of Object.keys(delta1)) {
    delta1[date] += delta2[date];
  }
};

/* Convert the given date string format to ISO compliant date string format.
For example, from '09/13/20' to '2020-09-13'
*/
const toISODateStr = (dateString) => {
  const pattern = /^(?<month>\d?\d)\/(?<day>\d?\d)\/(?<year>\d\d)$/;
  const match = dateString.match(pattern);
  const year = `20${match.groups.year}`;
  const month =
    match.groups.month.length === 1
      ? `0${match.groups.month}`
      : match.groups.month;
  const day =
    match.groups.day.length === 1 ? `0${match.groups.day}` : match.groups.day;
  const res = `${year}-${month}-${day}`;
  return res;
};

export { getHistoricalData };

// These are "country names" returned by the JHU API, however, these are not real countries.
const filterList = ["MS Zaandam", "Diamond Princess"];
