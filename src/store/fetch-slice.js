import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { weatherInfo: null, city: null, locationState: false },
  reducers: {
    setWeatherInfo(state, action) {
      state.weatherInfo = {
        lon: action.payload.lon,
        lat: action.payload.lat,
      };
    },
    setCity(state, action) {
      state.city = {
        city: action.payload.city,
      };
    },
    setLocationState(state, action) {
      state.locationState = action.payload.locationState;
    },
  },
});

export const fetchActions = fetchSlice.actions;

export default fetchSlice;
