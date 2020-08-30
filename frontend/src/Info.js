import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import Background from "./blue.jpg";
import AppBar from "@material-ui/core/AppBar";
import { Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
    marginTop: 0,
    // paddingTop: '10vh'
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  text1: {
    color: "white",
  },
  backgroundBlue: {
    backgroundColor: theme.palette.primary.main,
    height: "75vh",
  },
  backgroundWhite: {
    height: "150vh",
  },
  fab: {
    backgroundColor: theme.palette.primary.main,
  },
  image: {
    backgroundImage: `url(${"frontendsrcimages\teamwork.jpg"})`,
    backgroundRepeat: "no-repeat",
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  avatar1: {
    margin: theme.spacing(1),
    backgroundColor: "white",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    marginBottom: "200px",
  },
  p: {
    fontWeight: "bolder",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function MyInfo() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const [state, setState] = React.useState({
    Reading: false,
    Gaming: false,
    Jogging: false,
    Hiking: false,
  });
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        component="main"
        className={classes.root}
      >
        <CssBaseline />
        <Grid
          item
          xs={6}
          sm={3}
          md={5}
          component={Paper}
          elevation={20}
          className={classes.backgroundWhite}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Student Informtaion
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="studentid"
                label="Student ID"
                name="id"
                type="number"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="studentnickname"
                label="Nickname"
                name="nickname"
                type="nickname"
                autoFocus
              />
              <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Male</MenuItem>
                  <MenuItem value={20}>Female</MenuItem>
                </Select>
              </FormControl>
              </div>
              <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2020-08-30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="university"
                label="University"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="preference"
                label="Preference"
              />
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">interesting</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="Reading" />}
                    label="Reading"
                  />
                  <FormControlLabel
                    control={<Checkbox name="Gaming" />}
                    label="Gaming"
                  />
                  <FormControlLabel
                    control={<Checkbox name="Jogging" />}
                    label="Jogging"
                  />
                  <FormControlLabel
                    control={<Checkbox name="Hiking" />}
                    label="Hiking"
                  />
                </FormGroup>
                <FormHelperText>click if interest</FormHelperText>
              </FormControl>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <p className={classes.p}>
                By Clicking "Save Student Information", your personal info will update
              </p>
              <Button
                type="save"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.save}
              >
                Save Student Information
              </Button>
            </form>
          </div>
        </Grid>
        {/* <Grid item xs={false} sm={1} md={2}>
      <img src={logo} />
      </Grid> */}
      </Grid>
      
    </div>
  );
}
