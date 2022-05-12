import { useSelector } from "react-redux";
import MyCard from "./card";
import styles from "./main.module.scss";

const WeatherInfo = () => {
  const capitalWeather = useSelector((state) => state.capitalWeather);
  const convertUnixTime = (unixTime) => {
    // const unixTime = 1652332531;
    const date = new Date(unixTime * 1000);
    console.log(date.toLocaleTimeString("en-US"));
    return date.toLocaleTimeString("en-US");
  };
  return (
    <MyCard header="Weather Info" color="Light" title="Capital Weather Info">
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
          <b>{convertUnixTime(capitalWeather.sys.sunrise)}</b>
        </div>
        <div>
          <span>sunset :</span>
          <b>{convertUnixTime(capitalWeather.sys.sunset)}</b>
        </div>
      </div>
    </MyCard>
  );
};

export default WeatherInfo;
