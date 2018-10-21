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
import { licitar } from '../services/dataService';


class Licitacion extends Component {
  constructor() {
    super();

    document.title = 'Licitar | Consumer Pilot';

    this.state = {
      loading: false,
      fixerId: 0,
      clientId: 0,
      problemId: 0,
      licitacionId: 0,
      licitacionPresupuesto: 0,
      licitacionPropuesta: '',
      licitacionCostosVariables: 0,
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

    if (field === 'presupuesto' && validator.isLength(value, { min: 1 }) === false) {
      errors.name = 'Debes ingresar un presupuesto';
      this.setState(errors);
      return;
    }

    if (field === 'propuesta' && validator.isLength(value, { min: 1 }) === false) {
      errors.name = 'Debes comentar tu propuesta';
      this.setState(errors);
      return;
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
      fixerId, clientId, problemId, licitacionId, licitacionPresupuesto, licitacionPropuesta,
      licitacionCostosVariables, errors,
    } = this.state;
    const licitacionData = {
      fixerId, clientId, problemId, licitacionId, licitacionPresupuesto, licitacionPropuesta, licitacionCostosVariables
    };

    // Set response state back to default.
    this.setState({ response: { error: false, message: '' } });

    if (!Object.keys(errors).length) {
      this.setState({ loading: true });
      this.submit(licitacionData);
    }
  }

  submit(licitacionData) {
    this.props.dispatch(licitar(licitacionData))
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
          Licita tu Propuesta
        </Typography>

        <Typography variant="subheading" align="center" component="h3">
          Propone un presupuesto que se adapte a los requerimientos del cliente
        </Typography>

        {response.error &&
          <Typography variant="subheading" align="center" color="secondary">
            {response.message}
          </Typography>
        }

        {this.state.success &&
          <Typography variant="subheading" align="center">
            Registration successful.<br />
            <Link to="/">Please log in with your new email and password.</Link>
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
              required
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
          <FormControl margin="normal" fullWidth>
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
            {loading ? <CircularProgress size={16} className={classes.buttonProgress} /> : 'Licitar'}
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

Licitacion.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Licitacion));
