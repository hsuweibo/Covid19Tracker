/* Return a promise object. The resolved value is an object that maps each country to its daily change data. 
The object has the form
{
  [country1]: {
    'cases': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
    'deaths': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
    'recovered': {[date1]: [deltaCount], [date2]: [deltaCount], ...}
  }
  [country2]: ...,
  "Worldwide": ...
} */
const getHistoricalData = () => {
  return fetch("https://disease.sh/v3/covid-19/historical?lastdays=30")
    .then((response) => response.json())
    .then((fetchedData) => {
      const processedData = {};
      for (let datum of fetchedData) {
        const country = datum.country;
        if (!processedData[country]) {
          processedData[country] = {
            cases: accumulatedToDelta(datum.timeline.cases),
            deaths: accumulatedToDelta(datum.timeline.deaths),
            recovered: accumulatedToDelta(datum.timeline.recovered),
          };
        } else {
          mergeDelta(
            processedData[country].cases,
            accumulatedToDelta(datum.timeline.cases)
          );

          mergeDelta(
            processedData[country].deaths,
            accumulatedToDelta(datum.timeline.deaths)
          );

          mergeDelta(
            processedData[country].recovered,
            accumulatedToDelta(datum.timeline.recovered)
          );
        }
      }
      return processedData;
    })
    .then((processedData) =>
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
        .then((response) => response.json())
        .then((fetchedData) => {
          const worldwideData = {
            cases: accumulatedToDelta(fetchedData.cases),
            deaths: accumulatedToDelta(fetchedData.deaths),
            recovered: accumulatedToDelta(fetchedData.recovered),
          };
          processedData["Worldwide"] = worldwideData;
          return processedData;
        })
    );
};

/* Given an object with cumulated counts up to each date, calculate and convert to an object mapping each date to the incremental difference
of that day's count relative to the day before. The first day is skipped.
E.g. {0901: 3, 0902:10, 0903:12} is converted to {0902:7, 0903:2} */
const accumulatedToDelta = (originalData) => {
  const delta = {};
  let prevCount = null;
  for (const [currDate, currCount] of Object.entries(originalData)) {
    if (prevCount !== null) {
      delta[currDate] = currCount - prevCount;
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

export { getHistoricalData };
