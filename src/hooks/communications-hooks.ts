import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommunications } from "../actions/commsLeadActions";
import { RootState } from "../store";
import { ICommunication } from "../types/communication";

export const useGetCommunications = () => {
  const communications = useSelector(
    (state: RootState) => state.commsLead.communications
  );

  const commsLeadLoadStatus = useSelector(
    (state: RootState) => state.commsLead.commsLeadLoadStatus
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommunications());
  }, [dispatch]);

  return [commsLeadLoadStatus, communications] as const;
};

const pluckStringList = (communications: ICommunication[], prop: string) => {
  return communications
    .reduce(
      (acc, comm) => {
        comm[prop].forEach((item: string) => {
          if (!acc.includes(item)) {
            acc.push(item);
          }
        });
        comm.publish_history.forEach(c => {
          c[prop].forEach((item: string) => {
            if (!acc.includes(item)) {
              acc.push(item);
            }
          });
        });
        return acc;
      },
      [] as string[]
    )
    .sort();
};

export const useCommunicationFormValues = () => {
  const communications = useSelector(
    (state: RootState) => state.commsLead.communications
  );
  const tags = pluckStringList(communications, "tags");
  const emails = pluckStringList(communications, "emails");
  const phones = pluckStringList(communications, "phones");
  const slackChannels = pluckStringList(communications, "slack_channels");
  return {
    tags,
    emails,
    phones,
    slackChannels
  };
};
