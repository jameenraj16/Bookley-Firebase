import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { FormLabel, TextField } from '@mui/material';


export default function Review() {
  return (
    <React.Fragment>
      <TextField label="Mobile Number" variant='standard' required />
    </React.Fragment>
  );
}