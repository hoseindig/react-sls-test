import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { capitalActions } from "../store";
import { toast } from "react-toastify";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

import MyCard from "./card";
const CountryList = () => {
  const dispatch = useDispatch();
  const [loadingWeather, setLoadingWeather] = useState(false);

  const countryList = useSelector((state) => state.countryList);
  const selectedCountry = useSelector((state) => state.selectedCountry);

  const selectCountry = ({ target: input }) => {
    // console.log(input.name, input.value);
    const countrySelected = countryList.find((i) => i.id === input.value);
    if (countrySelected) {
      dispatch(capitalActions.setSelectedCountry(countrySelected));
      getWeatherInfo();
    }
  };

  const getWeatherInfo = () => {
    if (selectedCountry.capitalInfo.latlng.length > 1) {
      toast.info("Get WeatherInfo ....");
      setLoadingWeather(true);
      const latLog = `lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}`;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?${latLog}&appid=03f5964a0fcf804dbf8dd8aa6b51b9af`
        )
        .then((res) => {
          setLoadingWeather(false);
          const data = res.data;
          console.log(data.main);
          dispatch(capitalActions.setCapitalWeather(data));
          //   setCapitalWeather(data);
        });
    } else {
      toast.error("Weather Info Not Valid ....");
    }
  };

  return (
    <MyCard header="Step 2" title="Please Select Country" color="Info">
      <Form.Select
        aria-label="Default select example"
        onChange={selectCountry}
        name="counteryList"
      >
        <option>Open this select menu</option>
        {countryList.map((c) => {
          return (
            <option value={c.id} key={c.id}>
              {c.name.common}
            </option>
          );
        })}
      </Form.Select>
    </MyCard>
  );
};

export default CountryList;
