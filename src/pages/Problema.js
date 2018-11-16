import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'

import { eliminarProblema, aceptarLicitacion, obtenerProblema, obtenerPresupuestosDeProblema } from '../services/dataService';

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
      problemId: this.props.match.params.id,
      problemData: null,
      presupuestos: [],
      presupuestoAceptado: null,
      message: '',
    };

    // Bindings.
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(obtenerProblema(this.state.problemId))
    .then((response) => {
      this.setState({ problemData: response[0] }, this.checkForSettledPresupuesto(response[0]));
    })
    .catch((err) => {
      const response = {
        error: true,
        message: err.data,
      };
      this.setState({ response });
      this.setState({ loading: false });
    });

    if (typeof this.state.user.idCliente !== 'undefined') {
      this.props.dispatch(obtenerPresupuestosDeProblema(this.state.problemId))
      .then((response) => {
        if (response) {
        this.setState({ presupuestos: response });
      } else {
        this.setState({ presupuestos: [] });
      }
      })
      .catch((err) => {
        const response = {
          error: true,
          message: err.data,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
    }
  }

  checkForSettledPresupuesto(respuesta) {
    if (respuesta.presupuesto) {
      this.setState({ presupuestoAceptado: respuesta.presupuesto });
    }
  }



  clearMessage() {
    this.setState({ message: '' });
  }

  aceptarPresupuesto(idPresupuesto) {
    this.props.dispatch(aceptarLicitacion(idPresupuesto, this.state.problemId))
    .then((response) => {
      window.location.reload()
    })
    .catch((err) => {
      const response = {
        error: true,
        message: err.data,
      };
      this.setState({ response });
      this.setState({ loading: false });
    });
  }

  finalizar() {
    this.props.dispatch(eliminarProblema(this.state.problemId))
    .then((response) => {
      window.location.href = "http://localhost:3000/";
    })
    .catch((err) => {
      const response = {
        error: true,
        message: err.data,
      };
      this.setState({ response });
      this.setState({ loading: false });
    });
  }

  render() {
    
    const { classes } = this.props;
    const { problemId, problemData, user, presupuestos, presupuestoAceptado } = this.state;

    return (
      <main className={classes.layout}>
      {problemData &&
        <Grid container spacing={24}>

          {/* --- Problema --- */}
          <Grid item xs={12} md={12}>
            <Card>
                <CardHeader
                  title={this.state.problemData.titulo}
                  subheader={this.state.problemData.descripcion}
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
                      MIN ${this.state.problemData.presupuestoMinimo}
                    </Typography>
                    <Typography variant="display1" color="textPrimary" align="center">
                      MAX ${this.state.problemData.presupuestoMaximo}
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
                      Zona: {this.state.problemData.zona}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Rubro: {this.state.problemData.rubro.descripcion}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Calificación Usuario: {this.state.problemData.cliente.calificacionPromedio}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>

          {/* --- Licitar --- */}
          {user.idProfesional &&
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
                      href={'/licitar/' + problemId}>Licitar</Button>
                  </CardActions>
                </Card>
            </Grid>
          }

          {user.idCliente && presupuestoAceptado == null && presupuestos.length > 0 &&
            <Grid item xs={12} md={12}>
            <Card>
                <CardHeader
                  title="Presupuesto Recibidos"
                  subheader="Estas son las propuestos de los Fixers"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <hr></hr>
                <CardContent>
                  <div className={classes.cardPricing}>
                  {presupuestos.length > 0 && presupuestos.map((presupuesto, index) => {
                    return (
                      <div>
                        <Typography variant="title" color="textPrimary" align="center">
                          Propuesta {presupuesto.observacion}
                        </Typography>
                        <Typography variant="title" color="textPrimary" align="center">
                          Valor ${presupuesto.valor}
                        </Typography>
                        <Typography variant="title" color="textPrimary" align="center">
                          Cantidad de Dias ${presupuesto.cantJornadasLaborables}
                        </Typography>
                        <Typography variant="title" color="textPrimary" align="center">
                          Costos Variables (ej: materiales) ${presupuesto.valorMateriales}
                        </Typography>
                        <CardActions style={{justifyContent: 'center'}}>
                          <Button variant="raised" color="primary"size="small" onClick={() => {this.aceptarPresupuesto(presupuesto.idPresupuesto)}}>Aprobar</Button>
                        </CardActions>
                        <hr></hr>
                      </div>
                    );
                  })}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          }

          {user.idCliente && presupuestoAceptado == null && presupuestos.length == 0 &&
            <Grid item xs={12} md={12}>
            <Card>
                <CardHeader
                  title="Presupuesto Recibidos"
                  subheader="Estas son las propuestos de los Fixers"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <hr></hr>
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="title" color="textPrimary" align="center">
                      Todavia no hay propuestas :(
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          }

          {user.idCliente && presupuestoAceptado != null && 
            <Grid item xs={12} md={12}>
            <Card>
                <CardHeader
                  title="Presupuesto Asignado"
                  subheader="Este es el presupuesto asignado"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <hr></hr>
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="title" color="textPrimary" align="center">
                      Propuesta: {presupuestoAceptado.observacion}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Valor ${presupuestoAceptado.valor}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Cantidad de Dias {presupuestoAceptado.cantJornadasLaborables}
                    </Typography>
                    <Typography variant="title" color="textPrimary" align="center">
                      Costos Variables (ej: materiales) ${presupuestoAceptado.valorMateriales}
                    </Typography>
                    <CardActions style={{justifyContent: 'center'}}>
                          <Button variant="raised" color="primary"size="small" onClick={() => {this.finalizar()}}>Marcar Terminado</Button>
                    </CardActions>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          }

          {/* --- Fotos-Videos ---
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
          </Grid> */}

        </Grid>
      }
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