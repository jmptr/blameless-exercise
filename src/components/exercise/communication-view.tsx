import React, { FC, useState } from "react";
import { format } from "date-fns";
import {
  Button,
  Grid,
  Typography,
  Divider,
  makeStyles,
  createStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { ICommunication } from "../../types/communication";
import { ChipList } from "./chip-list";
import { CommHistoryAccordion } from "./comm-history-accordion";
import { EditCommunicationDialog } from "./edit-communication-dialog";

const useStyles = makeStyles(() =>
  createStyles({
    colRight: {
      textAlign: "right"
    }
  })
);

interface CommuncationViewProps {
  communication: ICommunication;
  onEditCommunication: (communication: ICommunication) => void;
}

export const CommunicationView: FC<CommuncationViewProps> = props => {
  const { communication, onEditCommunication } = props;
  const [showHistory, setShowHistory] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const handleHideClick = () => setShowHistory(!showHistory);
  const handleEditClick = () => setShowDialog(true);
  const handleEditClose = () => setShowDialog(false);
  const handleSubmit = (communication: ICommunication) => {
    onEditCommunication(communication);
    setShowDialog(false);
  };
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
          <Typography>Summary: {communication.summary}</Typography>
          <Typography>
            Updated: {format(communication.updated, "MM/dd/yyyy hh:mm:ss")}
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.colRight}>
          <Button
            id="edit-communication"
            variant="contained"
            startIcon={<EditIcon />}
            color="primary"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <ChipList labels={communication.tags} title="Tags" />
      <ChipList labels={communication.emails} title="Emails" />
      <ChipList labels={communication.phones} title="Phones" />
      <ChipList labels={communication.slack_channels} title="Slack Channels" />
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item xs={6}>
          <Typography>History:</Typography>
        </Grid>
        <Grid item xs={6} className={classes.colRight}>
          <Button
            variant="contained"
            startIcon={showHistory ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={handleHideClick}
          >
            Hide
          </Button>
        </Grid>
        <Grid item xs={12}>
          {showHistory &&
            communication.publish_history.map(history => (
              <CommHistoryAccordion
                key={history.created.$date}
                history={history}
              />
            ))}
        </Grid>
      </Grid>
      {showDialog && (
        <EditCommunicationDialog
          open={showDialog}
          onCloseClick={handleEditClose}
          onClose={handleEditClose}
          onSubmitClick={handleSubmit}
          communication={communication}
        />
      )}
    </>
  );
};
