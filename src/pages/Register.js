import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validator from 'validator';

// Material Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormLabel, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

// Custom Libraries
import AuthService from '../services';


class Register extends Component {

  constructor() {
    super();
    
    document.title = 'Registro | LetThemFix';

    this.state = {
      loading: false,
      activeStep: 0,
      skipped: new Set(),
      userType: '',
      name: '',
      lastname: '',
      email: '',
      email_confirmation: '',
      user: '',
      password: '',
      password_confirmation: '',
      fiscalId: '',
      birthDate: new Date(),
      street: '',
      streetNumber: '',
      city: '',
      state: '',
      phone: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
      success: false,
    };

    this.isStepOptional = step => {
      return false;
    };  

    this.handleNext = () => {
      const { activeStep } = this.state;
      let { skipped } = this.state;
      if (this.isStepSkipped(activeStep)) {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
      }
      this.setState({
        activeStep: activeStep + 1,
        skipped,
      });
    };

    this.handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };

    this.handleSkip = () => {
      const { activeStep } = this.state;
      if (!this.isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("No puedes saltearte un paso obligatorio.");
      }
  
      this.setState(state => {
        const skipped = new Set(state.skipped.values());
        skipped.add(activeStep);
        return {
          activeStep: state.activeStep + 1,
          skipped,
        };
      });
    };

    this.handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    this.isStepSkipped = step => {
      return false;
    };

    this.allFieldsCompleted = step => {
      if (step === 0) {
        if (this.state.userType.length <= 0 || this.state.name.length <= 0 || this.state.lastname.length <= 0 ||
          this.state.email.length <= 0 || this.state.email_confirmation.length <= 0 || this.state.user.length <= 0 ||
          this.state.password.length <= 0 || this.state.password_confirmation.length <= 0) {
            return true;
          } else {
            return false;
          }
      } else {
        if (this.state.fiscalId.length <= 0 || this.state.street.length <= 0 || this.state.streetNumber.length <= 0 ||
        this.state.city.length <= 0 || this.state.state.length <= 0 || this.state.phone.length <= 0) {
          return true;
        } else {
          return false;
        }
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    
    // If a field has a validation error, we'll clear it if corrected.
    const { errors } = this.state;
    if (name in errors) {
      this.validate(name, value);
    }
  }

  handleBlur(e) {
    const { name, value } = e.target;
    
    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }
    
    this.validate(name, value);
  }
  
  validate(field, value) {
    let errors = this.state.errors;

    if ('name' === field && false === validator.isLength(value, {min:4})) {
      errors.name = 'El nombre debe tener al menos 4 caracteres';
      this.setState(errors);
      return;
    }

    if ('email' === field && false === validator.isEmail(value)) {
      errors.email = 'El mail debe ser una direccion valida.';
      this.setState(errors);
      return;
    }

    if ('email_confirmation' === field ) {
      const email = this.state.email;
      if (email && value !== email) {
        errors.email_confirmation = 'Los emails deben ser iguales.';
        this.setState(errors);
        return;
      }
    }

    if ('password' === field && false === validator.isLength(value, {min:6})) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres.';
      this.setState(errors);
      return;
    }
    
    if ('password_confirmation' === field ) {
      const password = this.state.password;
      if (password && value !== password) {
        errors.password_confirmation = 'Las contraseñas deben coincidir.';
        this.setState(errors);
        return;
      }
    }
    
    // Validation passed.
    // Remove field from {errors} if present.
    if (field in errors) {
      delete errors[field];
      this.setState(errors);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { userType, name, lastname, email, user, password, fiscalId, birthDate, street, streetNumber, city, state, phone, errors} = this.state;
    const registerData = {
      "nombre": name,
      "apellido": lastname,
      "usuario": user,
      "password": password,
      "nroFiscal": fiscalId,
      "fechaNacimiento": new Date(birthDate),
      "telefono": phone,
      "mail": email,
      "domicilio": street,
      "altura": streetNumber,
      "localidad": city,
      "provincia": state
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' }});
    
    if (! Object.keys(errors).length) {
      this.setState({ loading: true });
      this.submit(userType, registerData);
    }
  }

  submit(userType, registerData) {
    this.props.dispatch(AuthService.register(userType, registerData))
      .then(() => {
        this.registrationForm.reset();
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        console.log(err);
        const errors = Object.values(err.error);
        const response = {
          error: true,
          message: errors,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
  }

  render() {
    // If user is authenticated we redirect to Dashboard.
    if (this.props.isAuthenticated && this.props.user) {
      return <Redirect to="/" replace />;
    }

    const { classes } = this.props;
    const { response, errors, loading, birthDate} = this.state;

    return (
      <Paper className={classes.slimActionForm} elevation={1}>
        <Typography variant="headline" align="center" component="h3">
          Registrate en LetThemFix
        </Typography>

        {response.error &&
          <Typography variant="subheading" align="center" color="secondary">
            {response.message}
          </Typography>
        }

        {this.state.success &&
          <Typography variant="subheading" align="center">
            Registracion exitosa
            <br />
            <Link to="/">Por favor, logeate con tu email/usuario y contraseña</Link>
            <br /><br />
          </Typography>
        }

        {!this.state.success &&
        <form className={classes.form} onSubmit={this.handleSubmit} ref={(el) => { this.registrationForm = el; }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de Registro</FormLabel>
            <RadioGroup
              aria-label="Tipo"
              name="userType"
              value={this.state.userType}
              onChange={this.handleChange}
            >
              <FormControlLabel value="user" control={<Radio />} label="Usuario" />
              <FormControlLabel value="fixer" control={<Radio />} label="Fixer" />
            </RadioGroup>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Nombre</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              autoFocus
              disabled={loading}
            />
            {('name' in errors) &&
            <FormHelperText error={true}>{errors.name}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Apellido</InputLabel>
            <Input
              id="lastname"
              name="lastname"
              autoComplete="lastname"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('lastname' in errors)}
              autoFocus
              disabled={loading}
            />
            {('lastname' in errors) &&
            <FormHelperText error={true}>{errors.lastname}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Email</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('email' in errors)}
              disabled={loading}
            />
            { ('email' in errors) &&
            <FormHelperText error={true}>{errors.email}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Confirmar Email</InputLabel>
            <Input
              id="email_confirmation"
              name="email_confirmation"
              autoComplete="email_confirmation"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('email_confirmation' in errors)}
              disabled={loading}
            />
            { ('email_confirmation' in errors) &&
            <FormHelperText error={true}>{errors.email_confirmation}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <InputLabel>Usuario</InputLabel>
          <Input
            id="user"
            name="user"
            autoComplete="user"
            
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            error={('user' in errors)}
            autoFocus
            disabled={loading}
          />
          {('user' in errors) &&
          <FormHelperText error={true}>{errors.user}</FormHelperText>
          }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Contraseña</InputLabel>
            <Input
              id="password"
              name="password"
              autoComplete="password"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('password' in errors)}
              disabled={loading}
              type="password"
            />
            { ('password' in errors) &&
            <FormHelperText error={true}>{errors.password}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Confirmar Contraseña</InputLabel>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              autoComplete="password_confirmation"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('password_confirmation' in errors)}
              disabled={loading}
              type="password"
            />
            { ('password_confirmation' in errors) &&
            <FormHelperText error={true}>{errors.password_confirmation}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
              <InputLabel>Nro. de Identificacion Fiscal</InputLabel>
              <Input
                id="fiscalId"
                name="fiscalId"
                autoComplete="fiscalId"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                error={('fiscalId' in errors)}
                autoFocus
                disabled={loading}
              />
              {('fiscalId' in errors) &&
              <FormHelperText error={true}>{errors.fiscalId}</FormHelperText>
              }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              id="birthDate"
              name="birthDate"
              label="Fecha de Nacimiento"
              type="date"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={birthDate}
              error={('birthDate' in errors)}
              autoFocus
              disabled={loading}
            />
            {('birthDate' in errors) &&
            <FormHelperText error={true}>{errors.birthDate}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Calle</InputLabel>
            <Input
              id="street"
              name="street"
              autoComplete="street"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('street' in errors)}
              autoFocus
              disabled={loading}
            />
            {('street' in errors) &&
            <FormHelperText error={true}>{errors.street}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Altura</InputLabel>
            <Input
              id="streetNumber"
              name="streetNumber"
              autoComplete="streetNumber"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('streetNumber' in errors)}
              autoFocus
              disabled={loading}
            />
            {('streetNumber' in errors) &&
            <FormHelperText error={true}>{errors.streetNumber}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Partido</InputLabel>
            <Input
              id="city"
              name="city"
              autoComplete="city"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('city' in errors)}
              autoFocus
              disabled={loading}
            />
            {('city' in errors) &&
            <FormHelperText error={true}>{errors.city}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Provincia</InputLabel>
            <Input
              id="state"
              name="state"
              autoComplete="state"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('state' in errors)}
              autoFocus
              disabled={loading}
            />
            {('state' in errors) &&
            <FormHelperText error={true}>{errors.state}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>Telefono</InputLabel>
            <Input
              id="phone"
              name="phone"
              autoComplete="phone"
              
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('phone' in errors)}
              autoFocus
              disabled={loading}
            />
            {('phone' in errors) &&
            <FormHelperText error={true}>{errors.phone}</FormHelperText>
            }
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            {loading ? <CircularProgress size={16} className={classes.buttonProgress} /> : 'Registrate'}
          </Button>
        </form>
        }

      </Paper>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  slimActionForm: {
    ...theme.mixins.gutters(),
    formControl: {
      margin: theme.spacing.unit * 3,
    },
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
  submit: {
    marginTop: theme.spacing.unit * 2
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Register));