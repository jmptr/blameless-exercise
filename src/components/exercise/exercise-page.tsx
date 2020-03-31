import React from "react";
import { LoadStatus } from "../../constants/loadStatus";
import { useDispatch } from "react-redux";
import { editCommunication } from "../../actions/commsLeadActions";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  createStyles
} from "@material-ui/core";
import { CommunicationView } from "./communication-view";
import { ICommunication } from "../../types/communication";
import { useGetCommunications } from "../../hooks/communications-hooks";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 800,
      margin: "auto",
      padding: "12px"
    }
  })
);

export default () => {
  const classes = useStyles();
  const [commsLeadLoadStatus, communications] = useGetCommunications();
  const dispatch = useDispatch();

  const handleEditCommunication = (commFields: ICommunication) => {
    dispatch(editCommunication(commFields));
  };

  if (commsLeadLoadStatus === LoadStatus.REQUEST) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography>Communications Lead</Typography>
        </Grid>
        <Grid item xs={12}>
          {communications.length > 0 ? (
            communications.map(communication => (
              <CommunicationView
                key={communication._id}
                communication={communication}
                onEditCommunication={handleEditCommunication}
              />
            ))
          ) : (
            <Typography>No communications found.</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
