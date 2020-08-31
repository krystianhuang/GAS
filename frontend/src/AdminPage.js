import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AdminHeader from "../src/AdminHeader";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function AdminHomePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AdminHeader />
      <Grid container spacing={15}>
      <Grid item xs={6}>
      
      <Button href="/studentdatabase" variant="contained" color="secondary" size="Large">View Student Database</Button>
      </Grid>
      <Grid item xs={3}>
      <Button href="/sortgroups" variant="contained" color="secondary" size="Large">Sort Groups</Button>
      
      
      </Grid>
      </Grid>
    </div>
  );
}
