import countriesService from "../services/countries";
import WeatherInfo from "./WeatherInfo";
import { useState, useEffect } from "react";

const CountryInfo = ({ countryName }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getCountry(countryName).then((country) => {
      setSelectedCountry(country);
    });
  }, []);

  if (selectedCountry != null) {
    return (
      <>
        <h1>{selectedCountry.name.common}</h1>
        <div>Capital: {selectedCountry.capital[0]}</div>
        <div>Area: {selectedCountry.area.toLocaleString("en-US")} km&#178;</div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={selectedCountry.flags.png} />
        <WeatherInfo
          capitalName={selectedCountry.capital[0]}
          capitalLat={selectedCountry.capitalInfo.latlng[0]}
          capitalLng={selectedCountry.capitalInfo.latlng[1]}
        />
      </>
    );
  }

  return <div>Loading country data...</div>;
};

export default CountryInfo;
