import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ExercisePage from "../../../src/components/exercise/exercise-page";
import { default as reducer } from "../../../src/reducers/commsLeadReducer";
import * as commsActions from "../../../src/actions/commsLeadActions";

jest.spyOn(commsActions, "getCommunications").mockReturnValue({
  type: "GET_COMMS_OK",
  payload: {
    response: {
      communications: [
        {
          _id: "5c34d71ee242d406444d3b7a",
          incident_id: 1,
          summary: "Test summary",
          tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
          emails: ["example@blameless.com", "user@blameless.com"],
          phones: ["+1 (909) 584-3610", "+1 (123) 134-3412"],
          slack_channels: ["Channel 1", "Channel 2"],
          publish_history: [
            {
              summary: "test2",
              tags: ["Old Tag 1", "Old Tag 2", "Old Tag 3", "Old Tag 4"],
              emails: ["example@blameless.com"],
              phones: ["+1 (909) 584-3610"],
              slack_channels: ["Old Channel 1", "Old Channel 2"],
              created: {
                $date: 1546966821784
              }
            },
            {
              summary: "test1",
              tags: ["Old Tag 1", "Old Tag 2"],
              emails: ["example2@blameless.com"],
              phones: ["+1 (909) 584-3610"],
              slack_channels: [
                "Old Channel 1",
                "Old Channel 2",
                "Old Channel 3"
              ],
              created: {
                $date: 1546966820032
              }
            }
          ],
          is_approved: true,
          is_published: true,
          is_external: false,
          is_deleted: false,
          created: 1546966814097,
          updated: 1546966821785,
          reminded: 1546966814098
        }
      ]
    }
  }
});

function renderWithRedux(ui: React.ReactNode) {
  const store = createStore(combineReducers({ commsLead: reducer }));
  const wrapper = render(<Provider store={store}>{ui}</Provider>);
  console.log(wrapper);
  return {
    ...wrapper,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe("Exercise Page", () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = renderWithRedux(<ExercisePage />);
  });

  it("Renders communications in component", async () => {
    expect(
      wrapper.queryAllByText("Communications Lead").length
    ).toBeGreaterThan(0);
    expect(wrapper).toBe(``);
    // expect(wrapper.queryAllByText("Edit Communication").length).toBe(0);
  });

  // it("should open the edit communication modal", () => {
  //   fireEvent.click(wrapper.queryAllByText("Edit")[0]);
  //   expect(wrapper.queryAllByText("Edit Communication").length).toBeGreaterThan(
  //     0
  //   );
  // });

  // it("should not submit the form before changes are made", () => {
  //   fireEvent.click(wrapper.queryAllByText("Submit")[0]);
  //   expect(wrapper.queryAllByText("Edit Communication").length).toBeGreaterThan(
  //     0
  //   );
  // });

  // it("should submit the form and close the modal if changes are made", () => {
  //   fireEvent.change(wrapper.getByLabelText("Summary"), {
  //     target: { value: "a" }
  //   });
  //   fireEvent.click(wrapper.queryAllByText("Submit")[0]);
  //   expect(wrapper.queryAllByText("Edit Communication").length).toBe(0);
  // });
});
