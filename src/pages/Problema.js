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
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// @TODO Would prefer to inline if possible.
import '../css/mood.css';

class Problema extends Component {
  
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      user: props.user,
      problemData: {
        problemId: 1,
        problemTitle: "Arreglar cañeria de pileta de cocina",
        problemDescription: "Se rompio el desagote de la pileta, va directo al piso. Hay un codo en el piso de plastico y esta roto.",
        rangoPresupuestario: {
          minimo: 1000,
          maximo: 3500
        },
        problemType: "Plomeria",
        problemZone: "Quilmes",
        userCalification: "7 / 10",
        problemImages: ["DNI-Dorso.jpg", "DNI-Frente.jpg"]
      },
      message: '',
    };
    // API endpoint.
    this.api = 'https://healthdrop.nanosense.app/api/v1/mood';

    // Bindings.
    this.clearMessage = this.clearMessage.bind(this);
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  
  render() {
    
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Grid container spacing={24}>

          {/* --- Problema --- */}
          <Grid item xs={12} md={12}>
            <Card>
                <CardHeader
                  title={this.state.problemData.problemTitle}
                  subheader={this.state.problemData.problemDescription}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
              </Card>
          </Grid>

          {/* --- Presupuesto --- */}
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Rango Presupuestario"
                  subheader="Presupuesto dispuesto a pagar"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display1" color="textPrimary" align="center">
                      MIN ${this.state.problemData.rangoPresupuestario.minimo}
                    </Typography>
                    <Typography variant="display1" color="textPrimary" align="center">
                      MAX ${this.state.problemData.rangoPresupuestario.maximo}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>

          {/* --- Caracteristicas del Problema --- */}
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Otros Datos"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                  <Typography variant="title" color="textPrimary" align="center">
                      Zona: {this.state.problemData.problemZone}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Rubro: {this.state.problemData.problemType}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Calificación Usuario: {this.state.problemData.userCalification}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>

          {/* --- Licitar --- */}
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Licitar"
                  subheader="Propone al Cliente un presupuesto"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="raised" color="primary"size="small"
                    href={'/licitar/' + this.state.problemData.problemId}>Licitar</Button>
                </CardActions>
              </Card>
          </Grid>

          {/* --- Fotos-Videos --- */}
          <Grid item xs={12} md={8}>
            <Carousel width="750px" showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true}>
              {this.state.problemData.problemImages.map((imagePath, index) => {
                return (
                  <div>
                    <img src={imagePath} />
                  </div>
                );
              })}
            </Carousel>
          </Grid>

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

export default connect(mapStateToProps)(withStyles(styles)(Problema));