import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

// Custom Libraries
import AuthService from '../services';


class Profile extends Component {

  constructor(props) {
    super(props);
    document.title = 'Perfil | LetThemFix';
    
    this.state = {
      user: this.props.user
    };
  }

  render() {

    const { classes } = this.props;
    console.log(this.state);

    return (
      <Paper className={classes.slimActionForm} elevation={1}>
        <Typography variant="headline" align="center" component="h3">
          Perfil
        </Typography>
        <List>
          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">Nombre</InputLabel>
              <Input
                id="name"
                name="name"
                value={this.state.user.nombre}
                disabled
                disableUnderline
                style={{'color':'#000'}}
              />
            </FormControl>
            <ListItemSecondaryAction>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>
          <ListItem>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={this.state.user.mail}
                disabled
                disableUnderline
                style={{'color':'#000'}}
              />
            </FormControl>
            <ListItemSecondaryAction>
              <IconButton aria-label="Edit">
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  slimActionForm: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(640 + theme.spacing.unit * 3 * 2)]: {
      width: 640,
      marginTop: theme.spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));