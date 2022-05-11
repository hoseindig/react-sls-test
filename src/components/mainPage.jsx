import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Form,
  Card,
} from "react-bootstrap";
import axios from "axios";
import MyCard from "./card";

import styles from "./main.module.scss";
const MainPage = () => {
  const [countryList, setCountryList] = useState([]);
  const [data, setData] = useState({});
  const [capitalWeather, setCapitalWeather] = useState({
    main: {
      temp: null,
      humidity: null,
      pressure: null,
      temp_min: null,
      temp_max: null,
    },
    visibility: null,
    sys: { sunrise: null, sunset: null },
  });
  const [selectedCountry, setSelectedCountry] = useState({
    id: "",
    capital: [],
    flags: { png: "" },
    latlng: [],
    capitalInfo: { latlng: [] },
    timezones: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("%c#2", "background:red", data);
    if (countryList.length > 0) {
      const country = countryList.find((i) => i.id === data.value);
      if (country) {
        setSelectedCountry(country);
        getWeatherInfo();
      }
    }
  }, [data]);

  const getCountry = (event) => {
    setLoading(true);
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      const data = res.data.map((i) => {
        let id = (i.id = i.area + "-" + i.cca2 + "-" + i.cca3 + "-" + i.ccn3);
        return { id, ...i };
      });
      setCountryList(data);
      setLoading(false);
    });
  };
  const getWeatherInfo = () => {
    setLoading(true);
    if (selectedCountry.capitalInfo.latlng.length > 1) {
      const latLog = `lat=${selectedCountry.capitalInfo.latlng[0]}&lon=${selectedCountry.capitalInfo.latlng[1]}`;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?${latLog}&appid=03f5964a0fcf804dbf8dd8aa6b51b9af`
        )
        .then((res) => {
          const data = res.data;
          console.log(data.main);
          setCapitalWeather(data);
          setLoading(false);
        });
    }
  };

  const selectCountry = ({ target: input }) => {
    console.log(input.name, input.value);
    setData({ name: input.name, value: input.value });
  };
  return (
    <Container>
      {/* Step 1 */}
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          {countryList.length === 0 && (
            <MyCard header="Step 1" title="Please Get Data" color="Light">
              <Button variant="success" disabled={loading} onClick={getCountry}>
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}

                {!loading && <span className="">Get Data</span>}
              </Button>
            </MyCard>
          )}
        </Col>
      </Row>
      {/* Step 2 */}
      <Row className="justify-content-md-center mt-5">
        <Col md="auto">
          {countryList.length > 0 && (
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
              {/* <div className="justify-content-md-center mt-3"></div> */}
              <Row>
                <Col className="mt-3">
                  <Spinner animation="border" variant="primary" />
                </Col>
              </Row>
            </MyCard>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        {/* show info */}

        <Col md="auto">
          {selectedCountry && (
            <MyCard
              header="Country Info"
              color="Light"
              title="Flag , Latitude , Timezone"
            >
              <div>
                <p>
                  <span>Capital :</span>
                  {selectedCountry.capital.map((c) => {
                    return <b key={c}>{c}</b>;
                  })}
                </p>
                <p>
                  <span>Flags :</span>
                  <img
                    src={selectedCountry.flags.png}
                    alt=""
                    style={{ width: "100%" }}
                  />
                </p>
                <p>
                  <span>Latitude :</span>
                  {selectedCountry.capitalInfo.latlng.map((i) => {
                    return <b key={i}> {i} </b>;
                  })}
                </p>

                <p>
                  <span>Timezone :</span>
                  {selectedCountry.timezones.map((i) => {
                    return (
                      <div key={i}>
                        <b> {i} </b>
                      </div>
                    );
                  })}
                </p>
              </div>
            </MyCard>
          )}
        </Col>
        {/* show weather */}

        <Col md="auto">
          {selectedCountry && (
            <MyCard
              header="Weather Info"
              color="Light"
              title="Capital Weather Info"
            >
              <div className={styles["card-info"]}>
                <div>
                  <span>temp :</span>
                  <b>{capitalWeather.main.temp}</b>
                </div>
                <div>
                  <span>temp max :</span>
                  <b>{capitalWeather.main.temp_max}</b>
                </div>
                <div>
                  <span>temp min :</span>
                  <b>{capitalWeather.main.temp_min}</b>
                </div>
                <div>
                  <span>pressure :</span>
                  <b>{capitalWeather.main.pressure}</b>
                </div>
                <div>
                  <span>humidity :</span>
                  <b>{capitalWeather.main.humidity}</b>
                </div>

                <div>
                  <span>visibility :</span>
                  <b>{capitalWeather.visibility}</b>
                </div>

                <div>
                  <span>sunrise :</span>
                  <b>{capitalWeather.sys.sunrise}</b>
                </div>
                <div>
                  <span>sunset :</span>
                  <b>{capitalWeather.sys.sunset}</b>
                </div>
              </div>
            </MyCard>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3"></Row>
    </Container>
  );
};

export default MainPage;
