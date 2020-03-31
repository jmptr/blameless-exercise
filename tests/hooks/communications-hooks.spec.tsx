import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import {
  useCommunicationFormValues,
  useGetCommunications
} from "../../src/hooks/communications-hooks";
import { default as reducer } from "../../src/reducers/commsLeadReducer";
import * as commsActions from "../../src/actions/commsLeadActions";

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
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}

describe("Communications Hooks", () => {
  describe("useGetCommunications", () => {
    const TestElem = () => {
      const [status] = useGetCommunications();
      return <span data-testid="status">{status}</span>;
    };

    it("Renders communications in component", async () => {
      renderWithRedux(<TestElem />);
      expect(screen.queryAllByText("OK").length).toBeGreaterThan(0);
    });
  });
  describe("useCommunicationFormValues", () => {
    const TestElem = () => {
      useGetCommunications();
      const {
        emails,
        phones,
        slackChannels,
        tags
      } = useCommunicationFormValues();
      return (
        <div>
          <span data-testid="tags">{tags.join(", ")}</span>
          <span data-testid="emails">{emails.join(", ")}</span>
          <span data-testid="phones">{phones.join(", ")}</span>
          <span data-testid="slackchannels">{slackChannels.join(", ")}</span>
        </div>
      );
    };

    it("Renders communication form values in component", async () => {
      renderWithRedux(<TestElem />);
      expect(
        screen.queryAllByText(
          "Old Tag 1, Old Tag 2, Old Tag 3, Old Tag 4, Tag 1, Tag 2, Tag 3, Tag 4"
        ).length
      ).toBeGreaterThan(0);
      expect(
        screen.queryAllByText(
          "example2@blameless.com, example@blameless.com, user@blameless.com"
        ).length
      ).toBeGreaterThan(0);
      expect(
        screen.queryAllByText("+1 (123) 134-3412, +1 (909) 584-3610").length
      ).toBeGreaterThan(0);
      expect(
        screen.queryAllByText(
          "Channel 1, Channel 2, Old Channel 1, Old Channel 2, Old Channel 3"
        ).length
      ).toBeGreaterThan(0);
    });
  });
});
