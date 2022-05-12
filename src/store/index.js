import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
    countryList: [],
    capitalWeather: {
        main: {
            temp: null,
            humidity: null,
            pressure: null,
            temp_min: null,
            temp_max: null,
        },
        visibility: null,
        sys: { sunrise: null, sunset: null },
    },
    selectedCountry: {

        name: { common: '' },
        id: "",
        capital: [],
        flags: { png: "" },
        latlng: [],
        capitalInfo: { latlng: [] },
        timezones: [],
    }
};
const CapitalSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {

        setCapitalWeather: (state, action) => {
            state.capitalWeather = action.payload;
        },
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        },
        setCountryList: (state, action) => {
            state.countryList = action.payload;
        },
    },
});

const store = configureStore({ reducer: CapitalSlice.reducer });

export const capitalActions = CapitalSlice.actions;
export default store;