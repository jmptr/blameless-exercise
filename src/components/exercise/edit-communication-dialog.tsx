import React, { FC, useRef, useState } from "react";
import {
  Button,
  DialogProps,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ICommunication } from "../../types/communication";
import { useCommunicationFormValues } from "../../hooks/communications-hooks";

interface EditCommunicationDialogProps extends DialogProps {
  communication: ICommunication;
  onCloseClick: () => void;
  onSubmitClick: (communication: ICommunication) => void;
}

export const EditCommunicationDialog: FC<
  EditCommunicationDialogProps
> = props => {
  const {
    communication,
    onCloseClick,
    onSubmitClick,
    ...remainingProps
  } = props;
  const formValues = useCommunicationFormValues();
  const [isDirty, setIsDirty] = useState(false);
  const [selectedTags, setTags] = useState(communication.tags);
  const [selectedEmails, setEmails] = useState(communication.emails);
  const [selectedPhones, setPhones] = useState(communication.phones);
  const [selectedSlackChannels, setSlackChannels] = useState(
    communication.slack_channels
  );

  const handleTagChange = (e: React.ChangeEvent<{}>, value: string[]) => {
    setTags(value);
    setIsDirty(true);
  };
  const handleEmailChange = (e: React.ChangeEvent<{}>, value: string[]) => {
    setEmails(value);
    setIsDirty(true);
  };
  const handlePhoneChange = (e: React.ChangeEvent<{}>, value: string[]) => {
    setPhones(value);
    setIsDirty(true);
  };
  const handleSlackChannelChange = (
    e: React.ChangeEvent<{}>,
    value: string[]
  ) => {
    setSlackChannels(value);
    setIsDirty(true);
  };

  const summaryRef = useRef<{ value: string }>({
    value: communication.summary
  });

  const handleChange = () => {
    setIsDirty(true);
  };

  const handleSubmitClick = () => {
    const updatedCommunication = {
      _id: communication._id,
      summary: summaryRef.current.value,
      tags: selectedTags,
      emails: selectedEmails,
      phones: selectedPhones,
      slack_channels: selectedSlackChannels
    };
    onSubmitClick(updatedCommunication as any);
  };

  return (
    <form noValidate onSubmit={handleSubmitClick}>
      <Dialog aria-labelledby="simple-dialog-title" {...remainingProps}>
        <DialogTitle id="simple-dialog-title">Edit Communication</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Use this form to update a communication entry.
          </DialogContentText>
          <DialogContentText>
            Note that tags, emails, phones and slack channels are
            comma-separated lists.
          </DialogContentText>
          <TextField
            id="summary"
            label="Summary"
            fullWidth
            inputRef={summaryRef}
            margin="dense"
            defaultValue={communication.summary}
            onChange={handleChange}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={formValues.tags}
            defaultValue={communication.tags}
            onChange={handleTagChange}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Tags"
                margin="dense"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            id="emails-standard"
            options={formValues.emails}
            defaultValue={communication.emails}
            onChange={handleEmailChange}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Emails"
                placeholder="Emails"
                margin="dense"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            id="phones-standard"
            options={formValues.phones}
            defaultValue={communication.phones}
            onChange={handlePhoneChange}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Phones"
                placeholder="Phones"
                margin="dense"
                fullWidth
              />
            )}
          />
          <Autocomplete
            multiple
            id="slackchannels-standard"
            options={formValues.slackChannels}
            defaultValue={communication.slack_channels}
            onChange={handleSlackChannelChange}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                label="Slack Channels"
                placeholder="Slack Channels"
                margin="dense"
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            disabled={!isDirty}
          >
            Submit
          </Button>
          <Button variant="contained" onClick={onCloseClick}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
