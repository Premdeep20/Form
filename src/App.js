import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';

import { withStyles } from '@material-ui/core/styles';

export class App extends Component {

  state = {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      department: '',
    },
    error: {
      firstName: false,
      lastName: false,
      email: false,
      phoneNo: false,
      department: false,
    }
  }

  change = (event) => {
    const { id, value } = event.target;
    const { data, error } = this.state;
    if (id === 'firstName') {
      let err = !this.validateName(value);
      this.setState((prevState) => ({
        ...prevState,
        data: {
          ...data,
          firstName: value,
        },
        error: {
          ...error,
          firstName: err,
        }
      }))
    } else if (id === 'lastName') {
      let err = !this.validateName(value);
      this.setState((prevState) => ({
        ...prevState,
        data: {
          ...data,
          lastName: value,
        },
        error: {
          ...error,
          lastName: err,
        }
      }))
    } else if (id === 'email') {
      let err = !this.validateEmail(value);
      this.setState((prevState) => ({
        ...prevState,
        data: {
          ...data,
          email: value,
        },
        error: {
          ...error,
          email: err,
        }
      }))
    } else if (id === 'phoneNo') {
      let err = !this.validatePhone(value);
      this.setState((prevState) => ({
        ...prevState,
        data: {
          ...data,
          phoneNo: value,
        },
        error: {
          ...error,
          phoneNo: err,
        }
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        data: {
          ...data,
          department: value,
        },
        error: {
          ...error,
          department: false,
        }
      }))
    }
  }

  validateName = (value) => {
    const reg = /^[a-zA-Z]+$/;
    return reg.test(value);
  }

  validateEmail = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(value);
  }

  validatePhone = (value) => {
    const reg = /^[789]\d{9}$/;
    return reg.test(value);
  }

  handleSubmit = () => {
    const { firstName, lastName, email, phoneNo, department } = this.state.data;
    const { error } = this.state;
    if (firstName && lastName && email && phoneNo && department) {
      if (!error.firstName && !error.lastName && !error.email && !error.phoneNo && !error.department) {
        let datas = JSON.parse(localStorage.getItem('DATAS'));
        if (!datas) {
          datas = [];
        }
        datas.push(this.state.data);
        localStorage.setItem('DATAS', JSON.stringify(datas));
        this.setState({
          data: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            department: '',
          }
        });
      }
    } else {
      this.setState({
        error: {
          ...error,
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          phoneNo: !phoneNo,
          department: !department,
        }
      })
    }
  }

  getData = (type) => {
    const { classes } = this.props;
    let datas = JSON.parse(localStorage.getItem('DATAS'));
    datas = datas.filter(data => data.department === type);
    return <>
      {
        (datas.length > 0) && <Typography variant="h5" gutterBottom align="center" className={classes.typography}>
          {type}
        </Typography>
      }
      {datas.map((data) => (
        <Grid item xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h6">
                {data.firstName} {data.lastName}
              </Typography>
              <Typography color="textSecondary">
                {data.email}
              </Typography>
              <Typography color="textSecondary">
                {data.phoneNo}
              </Typography>
              <Typography color="textSecondary">
                {data.department}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  }

  render() {
    const { classes } = this.props;
    const { firstName, lastName, email, phoneNo, department } = this.state.data;
    const datas = JSON.parse(localStorage.getItem('DATAS'));
    const { error } = this.state;
    return (
      <>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Typography variant="h6" gutterBottom>
                Employee details
            </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First name"
                    value={firstName}
                    fullWidth
                    onChange={this.change}
                    error={error.firstName}
                    helperText={error.firstName && 'Please fill valid first name!'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    value={lastName}
                    required
                    fullWidth
                    onChange={this.change}
                    error={error.lastName}
                    helperText={error.lastName && 'Please fill valid last name!'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    required
                    fullWidth
                    onChange={this.change}
                    error={error.email}
                    helperText={error.email && 'Please fill valid email!'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="phoneNo"
                    name="phoneNo"
                    label="Phone no"
                    value={phoneNo}
                    required
                    fullWidth
                    onChange={this.change}
                    error={error.phoneNo}
                    helperText={error.phoneNo && 'Please fill valid phone no!'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.formControl}
                    error={error.department}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                    <Select
                      id="department"
                      value={department}
                      onChange={this.change}
                      label="Department"
                    >
                      <MenuItem value="Fullstack">Full stack</MenuItem>
                      <MenuItem value="Frontend">Frontend</MenuItem>
                      <MenuItem value="Backend">Backend</MenuItem>
                    </Select>
                    {error.department && <FormHelperText>Please select department!</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </React.Fragment>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={classes.button}
            >
              Submit
          </Button>
          </Paper>
        </main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {datas && this.getData('Fullstack')}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {datas && this.getData('Frontend')}
          </Grid>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {datas && this.getData('Backend')}
          </Grid>
        </Container>
      </>
    );
  }
}

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  formControl: {
    minWidth: 200,
  },
  button: {
    marginTop: theme.spacing(3),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(1),
  },
  cardContent: {
    flexGrow: 1,
  },
  typography: {
    width: 'inherit',
  }
});

export default withStyles(styles)(App);
