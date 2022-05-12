import { useSelector, useDispatch } from "react-redux";
import { capitalActions } from "../store";
import MyCard from "./card";
const CapitalInfo = () => {
  const selectedCountry = useSelector((state) => state.selectedCountry);
  return (
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
  );
};

export default CapitalInfo;
