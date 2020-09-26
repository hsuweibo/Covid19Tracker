import * as Countries from "../Constants/Countries";
import * as CountTypes from "../Constants/CountTypes";
import GlobePic from "../assets/globe.jpg";

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
    flag: [url to flag image], 
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
        if (!filterList.includes(country)) {
          processedData[country] = {
            [CountTypes.ACTIVE]: datum.cases,
            [CountTypes.NEW_ACTIVE]: datum.todayCases,
            [CountTypes.DEATHS]: datum.deaths,
            [CountTypes.NEW_DEATHS]: datum.todayDeaths,
            [CountTypes.RECOVERED]: datum.recovered,
            [CountTypes.NEW_RECOVERED]: datum.todayRecovered,
            flag: datum.countryInfo.flag,
          };
        }
      }
      return processedData;
    })
    .then((processedData) => {
      return fetch("https://disease.sh/v3/covid-19/all?yesterday=true")
        .then((response) => response.json())
        .then((fetchedData) => {
          const worldwideData = {
            [CountTypes.ACTIVE]: fetchedData.cases,
            [CountTypes.NEW_ACTIVE]: fetchedData.todayDeaths,
            [CountTypes.DEATHS]: fetchedData.deaths,
            [CountTypes.NEW_DEATHS]: fetchedData.todayDeaths,
            [CountTypes.RECOVERED]: fetchedData.recovered,
            [CountTypes.NEW_RECOVERED]: fetchedData.todayRecovered,
            flag: GlobePic,
          };

          processedData[Countries.WORLDWIDE] = worldwideData;
          return processedData;
        });
    });
};

// These are "country names" returned by the Worldometer API, however, these are not real countries.
const filterList = ["MS Zaandam", "Diamond Princess"];
