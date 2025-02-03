import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  launches: [],
  filteredLaunches: [],
  filter: { year: "", rocket: "", mission: "" },
  loading: true,
  favoriteLaunches: JSON.parse(localStorage.getItem("favorites")) || [],
};

const launchesSlice = createSlice({
  name: "launches",
  initialState,
  reducers: {
    setLaunches: (state, action) => {
      state.launches = action.payload;
      state.filteredLaunches = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
      state.filteredLaunches = state.launches.filter((launch) => {
        return (
          (state.filter.year ? launch.date_utc.includes(state.filter.year) : true) &&
          (state.filter.rocket ? launch.rocket.toLowerCase().includes(state.filter.rocket.toLowerCase()) : true) &&
          (state.filter.mission ? launch.name.toLowerCase().includes(state.filter.mission.toLowerCase()) : true)
        );
      });
    },
    toggleFavorite: (state, action) => {
      const launchId = action.payload;
      if (state.favoriteLaunches.includes(launchId)) {
        state.favoriteLaunches = state.favoriteLaunches.filter((id) => id !== launchId);
      } else {
        state.favoriteLaunches.push(launchId);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favoriteLaunches));
    },
  },
});

export const { setLaunches, setLoading, setFilter, toggleFavorite } = launchesSlice.actions;
export default launchesSlice.reducer;

// Async thunk to fetch launches
export const fetchLaunches = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get("http://localhost:5000/api/launches");
    dispatch(setLaunches(response.data));
  } catch (error) {
    console.error("Error fetching launches:", error);
    dispatch(setLoading(false));
  }
};
