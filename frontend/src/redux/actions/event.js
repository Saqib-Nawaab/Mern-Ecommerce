import axios from "axios";
import { server } from "../../server.js";

export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      `${server}/event/create-event`,
      eventData,
      config
    );
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "eventCreateSuccess", payload: data });
    } else {
      dispatch({ type: "eventCreateFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "eventCreateFail", payload: error.message });
  }
};

export const getAllEvents = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });
    const response = await axios.get(`${server}/event/getAllEvents/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllEventsSuccess", payload: data });
    } else {
      dispatch({ type: "getAllEventsFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllEventsFail", payload: error.message });
  }
};

export const resetEventSuccess = () => (dispatch) => {
  dispatch({ type: "resetEventSuccess" });
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });
    const response = await axios.delete(`${server}/event/deleteEvent/${id}`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "deleteEventSuccess", payload: data });
    } else {
      dispatch({ type: "deleteEventFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "deleteEventFail", payload: error.message });
  }
};


export const getAllEventsUser = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsUserRequest" });
    const response = await axios.get(`${server}/event/getAllEventsUser`);
    const data = response.data;
    if (response.status === 200 || response.status === 201) {
      dispatch({ type: "getAllEventsUserSuccess", payload: data });
    } else {
      dispatch({ type: "getAllEventsUserFail", payload: data.message });
    }
  } catch (error) {
    dispatch({ type: "getAllEventsUserFail", payload: error.message });
  }
};
