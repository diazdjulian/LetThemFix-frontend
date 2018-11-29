import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/CheckCircleOutline';

// Custom Libraries
import Http, { appApiBase } from '../Http';
import { actualizarUsuario } from '../services/dataService';
import { retrieveUser } from "../services/authService"

class Profile extends Component {
  constructor(props) {
    super(props);
    document.title = 'Profile | Consumer Pilot';

    this.state = {
      user: this.props.user,
      active: [],
    };
  }

  componentDidMount() {
    Http.get(`${appApiBase}/api/user`)
      .then((response) => {
        const { pizza = '', birthdate = '' } = response.data.entityObj.data.userattrib;
        this.setState({ pizza, birthdate });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleEdit = (e, key) => {
    let { active } = this.state;

    // Toggle the key.
    if (active.includes(key)) {
      active = active.filter(item => item !== key);
      this.handleSave(key);
    } else {
      active.push(key);
    }

    this.setState({ active });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    let user = Object.assign({}, this.state.user) //creating copy of object
    user[name] = value //updating value
    this.setState({user})
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSave() {
    this.props.dispatch(actualizarUsuario(this.state.user.userType, this.state.user))
      .then((response) => {
        console.log(response);
        this.props.dispatch(retrieveUser(this.state.user.userType, this.state.user.nroFiscal))
          .then((response) => window.location.reload())
          .catch((err) => window.location.reload())
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    const { user, active } = this.state;

    return (
      <Paper className={classes.slimActionForm} elevation={1}>
        <Typography variant="headline" align="center" component="h3">
          Perfil
        </Typography>
        <List>
          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="nombre">Nombre</InputLabel>
              <Input
                id="nombre"
                name="nombre"
                value={user.nombre}
                disabled
                disableUnderline
                style={{'color':'#000'}}
              />
            </FormControl>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="apellido">Apellido</InputLabel>
              <Input
                id="apellido"
                name="apellido"
                value={user.apellido}
                disabled
                disableUnderline
                style={{'color':'#000'}}
              />
            </FormControl>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="nroFiscal">Nro Fiscal</InputLabel>
              <Input
                id="nroFiscal"
                name="nroFiscal"
                value={user.nroFiscal}
                disabled={!active.includes('nroFiscal')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'nroFiscal')}>
                {active.includes('nroFiscal') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="fechaNacimiento">Fecha de Nacimiento</InputLabel>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={user.fechaNacimiento}
                disabled={!active.includes('fechaNacimiento')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'fechaNacimiento')}>
                {active.includes('fechaNacimiento') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="telefono">Telefono</InputLabel>
              <Input
                id="telefono"
                name="telefono"
                value={user.telefono}
                disabled={!active.includes('telefono')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'telefono')}>
                {active.includes('telefono') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="mail">Mail</InputLabel>
              <Input
                id="mail"
                name="mail"
                value={user.mail}
                disabled={!active.includes('mail')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'mail')}>
                {active.includes('mail') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="domicilio">Calle</InputLabel>
              <Input
                id="domicilio"
                name="domicilio"
                value={user.domicilio}
                disabled={!active.includes('domicilio')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'domicilio')}>
                {active.includes('domicilio') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="altura">Calle Altura</InputLabel>
              <Input
                id="altura"
                name="altura"
                value={user.altura}
                disabled={!active.includes('altura')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'altura')}>
                {active.includes('altura') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="localidad">Localidad</InputLabel>
              <Input
                id="localidad"
                name="localidad"
                value={user.localidad}
                disabled={!active.includes('localidad')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'localidad')}>
                {active.includes('localidad') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>

          <ListItem>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="provincia">Provincia</InputLabel>
              <Input
                id="provincia"
                name="provincia"
                value={user.provincia}
                disabled={!active.includes('provincia')}
                disableUnderline
                style={{'color':'#000'}}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </FormControl>
            <ListItemSecondaryAction>
            <IconButton aria-label="Editar" onClick={e => this.toggleEdit(e, 'provincia')}>
                {active.includes('provincia') ? <CheckIcon /> : <EditIcon />}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li"/>
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
    [theme.breakpoints.up(640 + (theme.spacing.unit * 3 * 2))]: {
      width: 640,
      marginTop: theme.spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    marginTop: theme.spacing.unit * 2,
    justifyContent: 'center',
    display: 'flex',
  },
});

Profile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));