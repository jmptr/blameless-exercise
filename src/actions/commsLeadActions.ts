import { createActionAsync } from "redux-act-async";
import { createAction } from "@reduxjs/toolkit";
import $http from "axios";
import { EDIT_COMM, GET_COMMS } from "../constants/commsLeadConstants";
import { ICommunication } from "../types/communication";

export const getCommunications = createActionAsync(GET_COMMS, () => {
  return $http
    .get(`/commsLead.json`)
    .then(res => res.data)
    .catch(error => {
      throw error;
    });
});

export const editCommunication = createAction<ICommunication>(EDIT_COMM);
