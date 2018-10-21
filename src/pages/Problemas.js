import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Material Components
import { withStyles } from '@material-ui/core/styles/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Custom Libraries
import Http from '../Http';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// @TODO Would prefer to inline if possible.
import '../css/mood.css';

class Problemas extends Component {
  
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      user: props.user,
      selected: '',
      message: '',
      data_id: false,
    };

    // Problems
    this.problemas = [
      {
        problemId: 1,
        problemTitle: "Arreglar cañeria de pileta de cocina",
        problemDescription: "Se rompio el desagote de la pileta, va directo al piso. Hay un codo en el piso de plastico y esta roto.",
        rangoPresupuestario: {
          minimo: 1000,
          maximo: 3500
        },
        problemType: "Plomeria",
        problemZone: "Quilmes",
        userCalification: "7 / 10"
      },
      {
        problemId: 2,
        problemTitle: "Poner baldosas en entrada de casa",
        problemDescription: "Hicimos toda la vereda nueva y necesitamos poner las baldosas. Con el agujero para el medidor de agua.",
        rangoPresupuestario: {
          minimo: 5000,
          maximo: 7500
        },
        problemType: "Albañeria",
        problemZone: "Burzaco",
        userCalification: "7 / 10"
      },
      {
        problemId: 3,
        problemTitle: "Reemplazar tejas",
        problemDescription: "Tengo un techo a dos aguas y necesito reemplazar unas 15 tejas, y chequear que el resto esten clavadas.",
        rangoPresupuestario: {
          minimo: 1500,
          maximo: 2700
        },
        problemType: "Techos",
        problemZone: "Barrio Norte, CABA",
        userCalification: "7 / 10"
      }
    ];

    // API endpoint.
    this.api = 'https://healthdrop.nanosense.app/api/v1/mood';
  }
  
  render() {
    
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Grid container spacing={24}>
          {this.problemas.map((problema, index) => {
            return (
            <Grid item xs={12} md={20} spacing={20}>
              <Card>
                <CardHeader
                  title={problema.problemTitle}
                  subheader={problema.problemDescription}
                  titleTypographyProps={{ align: 'center', variant: 'display3' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      ${problema.rangoPresupuestario.minimo}-{problema.rangoPresupuestario.maximo}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" align="left">
                      Rubro: {problema.problemType}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" align="left">
                      Zona: {problema.problemZone}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" align="left">
                      Calificacion Usuario: {problema.userCalification}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="raised" color="primary"size="small" href={"/problema:" + problema.problemId}>Ver más</Button>
                </CardActions>
              </Card>
            </Grid>);
          })}
        </Grid>
      </main>
    );

  }

}

const styles = theme => ({
  pageTitle: {
    marginBottom: theme.spacing.unit * 6,
  },
  actionForm: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(880 + theme.spacing.unit * 3 * 2)]: {
      width: 880,
      marginTop: theme.spacing.unit * 10,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Problemas));