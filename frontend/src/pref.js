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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
    height: "200vh",
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
    marginBottom: "100px",
  },
  p: {
    fontWeight: "bolder",
  },
}));

export default function Preference() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1. Online Shopping Website');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
              Preference
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
              <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Group Size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>4</MenuItem>
                  <MenuItem value={20}>5</MenuItem>
                  <MenuItem value={30}>6</MenuItem>
                </Select>
              </FormControl>
              </div>
              <FormControl component="fieldset">
                <FormLabel component="legend">Developer type</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="1.	Frontend" control={<Radio />} label="1.	Frontend" />
                    <FormControlLabel value="2.	Backend" control={<Radio />} label="2. Backend" />
                    <FormControlLabel value="3.	Both" control={<Radio />} label="3.	Both" />
                    <FormControlLabel value="4.	None" control={<Radio />} label="4.	None" />
                </RadioGroup>
                </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Languages/Skills</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="1. Java" />}
                    label="1. Java"
                  />
                  <FormControlLabel
                    control={<Checkbox name="2.	JavaScript" />}
                    label="2. JavaScript"
                  />
                  <FormControlLabel
                    control={<Checkbox name="3. C" />}
                    label="3. C"
                  />
                  <FormControlLabel
                    control={<Checkbox name="4. C++" />}
                    label="4. C++"
                  />
                  <FormControlLabel
                    control={<Checkbox name="5. Python" />}
                    label="5. Python"
                  />
                  <FormControlLabel
                    control={<Checkbox name="6. PHP" />}
                    label="6. PHP"
                  />
                  <FormControlLabel
                    control={<Checkbox name="7. Ruby" />}
                    label="7. Ruby"
                  />
                  <FormControlLabel
                    control={<Checkbox name="8. Swift" />}
                    label="8. Swift"
                  />
                  <FormControlLabel
                    control={<Checkbox name="9. HTML & CSS" />}
                    label="9. HTML & CSS"
                  />
                  <FormControlLabel
                    control={<Checkbox name="10. XML" />}
                    label="10. XML"
                  />
                  <FormControlLabel
                    control={<Checkbox name="11. XCode IDE" />}
                    label="11. XCode IDE"
                  />
                  <FormControlLabel
                    control={<Checkbox name="12. Objective-C" />}
                    label="12. Objective-C"
                  />
                  <FormControlLabel
                    control={<Checkbox name="13. Android Studio" />}
                    label="13. Android Studio"
                  />
                  <FormControlLabel
                    control={<Checkbox name="14. Firebase" />}
                    label="14. Firebase"
                  />
                  <FormControlLabel
                    control={<Checkbox name="15. MongoDB" />}
                    label="15. MongoDB"
                  />
                </FormGroup>
                <FormHelperText>At least 1 language/skill for frontend and backend</FormHelperText>
                </FormControl>

                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Role</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="1.	Documentation" />}
                    label="1. Documentation"
                  />
                  <FormControlLabel
                    control={<Checkbox name="2.	Development" />}
                    label="2. Development"
                  />
                  <FormControlLabel
                    control={<Checkbox name="3.	Wireframes Designer " />}
                    label="3. Wireframes Designer "
                  />
                  <FormControlLabel
                    control={<Checkbox name="4.	UI Designer" />}
                    label="4. UI Designer"
                  />
                  <FormControlLabel
                    control={<Checkbox name="5.	Database Developer" />}
                    label="5. Database Developer"
                  />
                </FormGroup>
                <FormHelperText>Each group needs at least 1 of each role</FormHelperText>
              </FormControl>
              <FormControl component="fieldset">
            <FormLabel component="legend">Topic</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="1.	Online Shopping Website" control={<Radio />} label="1. Online Shopping Website" />
                <FormControlLabel value="2.	Health Service Mobile Application" control={<Radio />} label="2. Health Service Mobile Application" />
                <FormControlLabel value="3.	Messaging Mobile Application" control={<Radio />} label="3.	Messaging Mobile Application" />
                <FormControlLabel value="4.	Restaurant Booking Website" control={<Radio />} label="4. Restaurant Booking Website" />
                <FormControlLabel value="5.	Weather Website" control={<Radio />} label="5. Weather Website" />
            </RadioGroup>
            </FormControl>
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <p className={classes.p}>
                By Clicking "Submit the preference", your docu will save
              </p>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit the preference
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
