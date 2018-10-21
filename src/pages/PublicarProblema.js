import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator';

// Material Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel, FormHelperText, Button, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom Libraries
import AuthService from '../services';


class PublicarProblema extends Component {
  constructor() {
    super();

    document.title = 'Publicar Problema | LetThemFix';

    this.state = {
      loading: false,
      problemId: 0,
      userId: 0,
      problemTitle: '',
      problemDescription: '',
      problemImages: [],
      rangoPresupuestario: { minimo: 0, maximo: 0 },
      problemType: '',
      problemZone: '',
      errors: {},
      response: {
        error: false,
        message: '',
      },
      success: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // If a field has a validation error, we'll clear it if corrected.
    const { errors } = this.state;
    if (name in errors) {
      this.validate(name, value);
    }
  }

  handleBlur = (e) => {
    const { name, value } = e.target;

    // Avoid validation until input has a value.
    if (value === '') {
      return;
    }

    this.validate(name, value);
  }

  validate(field, value) {
    const { errors } = this.state;

    if (field === 'firstName' && validator.isLength(value, { min: 3 }) === false) {
      errors.name = 'The name field must be at least 3 characters.';
      this.setState(errors);
      return;
    }

    if (field === 'lastName' && validator.isLength(value, { min: 3 }) === false) {
      errors.name = 'The name field must be at least 3 characters.';
      this.setState(errors);
      return;
    }

    if (field === 'email' && validator.isEmail(value) === false) {
      errors.email = 'The email field must be a valid email.';
      this.setState(errors);
      return;
    }

    if (field === 'password' && validator.isLength(value, { min: 6 }) === false) {
      errors.password = 'The password field must be at least 6 characters.';
      this.setState(errors);
      return;
    }

    if (field === 'password_confirmation') {
      const { password } = this.state;
      if (password && value !== password) {
        errors.password_confirmation = 'Password fields must match.';
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

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName, lastName, email, password, password_confirmation, errors,
    } = this.state;
    const credentials = {
      firstName,
      lastName,
      email,
      password,
      password_confirmation,
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    if (!Object.keys(errors).length) {
      this.setState({ loading: true });
      this.submit(credentials);
    }
  }

  submit(credentials) {
    this.props.dispatch(AuthService.register(credentials))
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch((err) => {
        console.log(err);
        const errors = Object.values(err.errors);
        const messages = errors.map(m => Object.values(m)[0]);
        messages.join(' ');
        const response = {
          error: true,
          message: messages,
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
    const { response, errors, loading } = this.state;

    return (
      <Paper className={classes.slimActionForm} elevation={1}>
        <Typography variant="headline" align="center" component="h3">
          Publica tu Problema
        </Typography>

        <Typography variant="subheading" align="center" component="h3">
          Selecciona el rubro, titula y detalla tu problema, y subi fotos para ayudar a los Fixers ;) 
        </Typography>

        {response.error &&
          <Typography variant="subheading" align="center" color="secondary">
            {response.message}
          </Typography>
        }

        {this.state.success &&
          <Typography variant="subheading" align="center">
            Publicación de problema exitoso.<br />
            Analizaremos el mismo y en breve los Fixers podrn verlo.<br />
            <Link to="/">Vuelve al Dashboard</Link>
          </Typography>
        }

        {!this.state.success &&
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="presupuesto">Presupuesto</InputLabel>
            <Input
              id="presupuesto"
              name="presupuesto"
              type="number"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('presupuesto' in errors)}
              autoFocus
              disabled={loading}
            />
            {('presupuesto' in errors) &&
            <FormHelperText error>{errors.name}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <TextField
              id="propuesta"
              name="propuesta"
              label="Comenta tu propuesta"
              multiline
              rowsMax="10"
              onChange={this.handleChange}
              margin="normal"
              onBlur={this.handleBlur}
              error={('propuesta' in errors)}
              disabled={loading}
            />
            {('propuesta' in errors) &&
            <FormHelperText error>{errors.name}</FormHelperText>
            }
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="costosVariables">Estima tus costos variables (ej: materiales)</InputLabel>
            <Input
              id="costosVariables"
              name="costosVariables"
              type="number"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              error={('costosVariables' in errors)}
              disabled={loading}
            />
            { ('costosVariables' in errors) &&
            <FormHelperText error>{errors.email}</FormHelperText>
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
            {loading ? <CircularProgress size={16} className={classes.buttonProgress} /> : 'Publicar'}
          </Button>
        </form>
        }

      </Paper>
    );
  }
}

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
  submit: {
    marginTop: theme.spacing.unit * 2,
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -8,
  },
});

PublicarProblema.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(PublicarProblema));
