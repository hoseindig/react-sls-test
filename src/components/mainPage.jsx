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
import { useSelector, useDispatch } from "react-redux";
import { capitalActions } from "../store";
import { toast } from "react-toastify";
import axios from "axios";
import MyCard from "./card";
import CaptialInfo from "./capitalInfo";
import WeatherInfo from "./weatherInfo";
import CountryList from "./counteryList";
import styles from "./main.module.scss";
const MainPage = () => {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.selectedCountry);
  const capitalWeather = useSelector((state) => state.capitalWeather);
  const [countryList, setCountryList] = useState([]);

  const [loading, setLoading] = useState(false);

  const getCountry = (event) => {
    setLoading(true);
    toast.info("Get Country List ...");
    axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
      const data = res.data.map((i) => {
        let id = (i.id = i.area + "-" + i.cca2 + "-" + i.cca3 + "-" + i.ccn3);
        return { id, ...i };
      });
      setCountryList(data);
      dispatch(capitalActions.setCountryList(data));
      setLoading(false);
    });
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
        <Col md="auto">{countryList.length > 0 && <CountryList />}</Col>
      </Row>
      {selectedCountry.id && (
        <Row className="justify-content-md-center mt-3">
          {/* show info */}

          <Col md="auto">{selectedCountry && <CaptialInfo />}</Col>
          {/* show weather */}

          <Col md="auto">{capitalWeather.id && <WeatherInfo />}</Col>
        </Row>
      )}

      <Row className="justify-content-md-center mt-3"></Row>
    </Container>
  );
};

export default MainPage;
