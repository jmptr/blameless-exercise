import React, { FC } from "react";
import { Chip, Grid, Typography } from "@material-ui/core";

interface ChipListProps {
  title: string;
  labels: string[];
}

export const ChipList: FC<ChipListProps> = props => {
  const { title, labels } = props;
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle2">{title}</Typography>
      </Grid>
      <Grid container spacing={1} direction="row">
        {labels.map(label => (
          <Grid item key={label}>
            <Chip label={label} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
