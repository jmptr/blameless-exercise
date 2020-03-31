import { LoadStatus } from "../constants/loadStatus";
import { EDIT_COMM } from "../constants/commsLeadConstants";
import { getCommunications } from "../actions/commsLeadActions";
import { createReducer } from "@reduxjs/toolkit";
import { ICommunication, ICommHistory } from "../types/communication";

interface IDefaultState {
  communications: ICommunication[];
  commsLeadLoadStatus: string;
}

export const initialState: IDefaultState = {
  communications: [],
  commsLeadLoadStatus: LoadStatus.EMPTY
};

export default createReducer<IDefaultState>(initialState, {
  [getCommunications.request.getType()]: state => {
    state.commsLeadLoadStatus = LoadStatus.REQUEST;
  },
  [getCommunications.error.getType()]: state => {
    state.commsLeadLoadStatus = LoadStatus.ERROR;
  },
  [getCommunications.ok.getType()]: (state, action) => {
    state.commsLeadLoadStatus = LoadStatus.OK;
    state.communications = action.payload.response.communications;
  },
  [EDIT_COMM]: (state, action: { payload: ICommunication }) => {
    const { payload } = action;
    // find the index of the edited item
    const foundIdx = state.communications.findIndex(
      ({ _id }) => _id === payload._id
    );
    if (foundIdx === -1) {
      return;
    }
    // create a new history item
    const foundItem = state.communications[foundIdx];
    const hist: ICommHistory = {
      summary: foundItem.summary,
      tags: foundItem.tags,
      emails: foundItem.emails,
      phones: foundItem.phones,
      slack_channels: foundItem.slack_channels,
      created: { $date: foundItem.updated }
    };
    const updatedItem: ICommunication = {
      ...foundItem,
      ...payload,
      updated: Date.now(),
      // put the new history object on the top of the list to preserve the date-descending sort of the list
      publish_history: [hist, ...foundItem.publish_history]
    };
    const { communications } = state;
    communications.splice(foundIdx, 1, updatedItem);
    state.communications = communications;
  }
});
