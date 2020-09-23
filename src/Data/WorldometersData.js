/* Return a Promise. The resolved value is an object mapping each country to a collection of data: 
today's new, and total accumulated death/recovered/cases count. 
The object has the form: 
{
  [country1]: {
    cases: ...,
    newCases: ...,
    deaths: ...,
    newDeaths: ...,
    recovered: ...,
    newRecovered: ...,
  },
  ...,
  'Worldwide': {...}
}
*/
export const getOverviewData = () => {
  return fetch("https://disease.sh/v3/covid-19/countries?yesterday=true")
    .then((response) => response.json())
    .then((fetchedData) => {
      const processedData = {};
      for (let datum of fetchedData) {
        const country = datum.country;
        processedData[country] = {
          cases: datum.cases,
          newCases: datum.todayCases,
          deaths: datum.deaths,
          newDeaths: datum.todayDeaths,
          recovered: datum.recovered,
          newRecovered: datum.todayRecovered,
          flag: datum.countryInfo.flag,
        };
      }
      return processedData;
    })
    .then((processedData) => {
      return fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
        .then((response) => response.json())
        .then((fetchedData) => {
          const {
            cases,
            todayCases: newCases,
            deaths,
            todayDeaths: newDeaths,
            recovered,
            todayRecovered: newRecovered,
          } = fetchedData;

          const worldwideData = {
            cases,
            newCases,
            deaths,
            newDeaths,
            recovered,
            newRecovered,
          };

          processedData["Worldwide"] = worldwideData;
          return processedData;
        });
    });
};
