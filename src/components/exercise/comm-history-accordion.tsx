import React, { FC } from "react";
import { format } from "date-fns";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  createStyles,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ICommHistory } from "../../types/communication";
import { ChipList } from "./chip-list";

const useStyles = makeStyles(() =>
  createStyles({
    summaryPanelCol: {
      flexBasis: "33%"
    }
  })
);

interface CommHistoryAccordionProps {
  history: ICommHistory;
}

export const CommHistoryAccordion: FC<CommHistoryAccordionProps> = props => {
  const { history } = props;
  const classes = useStyles();
  return (
    <ExpansionPanel key={history.created.$date}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.summaryPanelCol}>
          {format(history.created.$date, "MM/dd/yyyy hh:mm:ss")}
        </Typography>
        <Typography className={classes.summaryPanelCol}>
          {history.summary}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <>
          <Grid item xs={12}>
            <ChipList labels={history.tags} title="Tags" />
            <ChipList labels={history.emails} title="Emails" />
            <ChipList labels={history.phones} title="Phones" />
            <ChipList labels={history.slack_channels} title="Slack Channels" />
          </Grid>
        </>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
