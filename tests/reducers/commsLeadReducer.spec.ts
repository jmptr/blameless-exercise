import $http from "axios";
import { LoadStatus } from "../../src/constants/loadStatus";
import commsLeadReducer, {
  initialState
} from "../../src/reducers/commsLeadReducer";

describe("Communications Lead Reducer", () => {
  let currentState: typeof initialState;

  beforeEach(async () => {
    const fetchedCommunications = await $http
      .get(`/commsLead.json`)
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
    const action = {
      type: `GET_COMMS_${LoadStatus.OK}`,
      payload: {
        response: fetchedCommunications
      }
    };
    currentState = commsLeadReducer(initialState, action);
  });

  it("Should get communications", () => {
    expect(initialState.communications).toEqual([]);
    expect(currentState.communications).not.toBe(initialState.communications);
    expect(currentState.communications).not.toEqual([]);
  });

  it("Should edit a communication by _id", () => {
    const action = {
      type: "EDIT_COMM",
      payload: {
        _id: "5c34d71ee242d406444d3b7a",
        summary: "Test summary updated",
        tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
        emails: [
          "example@blameless.com",
          "user@blameless.com",
          "jm@blameless.com"
        ],
        phones: ["+1 (909) 584-3610", "+1 (123) 134-3412", "+1 (805) 308-6803"],
        slack_channels: ["Channel 3"]
      }
    };
    const nextState = commsLeadReducer(currentState, action);
    expect(nextState.communications).not.toBe(currentState.communications);
    expect(nextState.communications[0].tags).toBe(action.payload.tags);
  });
});
