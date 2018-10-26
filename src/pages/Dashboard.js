import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import dataService from '../services'
// Material Components
import { withStyles } from '@material-ui/core/styles/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { obtenerProblema, obtenerProblemasTodos, obtenerProblemasDeCliente } from '../services/dataService';

class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    document.title = 'Dashboard | LetThemFix';
    
    // Initial state.
    this.state = {
      loading: false, 
      user: props.user,
      problemas: []
    };
  }

  componentWillMount() {
    if (typeof this.state.user.idCliente !== 'undefined') {
      this.props.dispatch(obtenerProblemasDeCliente(this.state.user.idCliente))
      .then((response) => {
        this.setState({ problemas: response });
      })
      .catch((err) => {
        const response = {
          error: true,
          message: err.data,
        };
        this.setState({ response });
        this.setState({ loading: false });
      });
    } else if (typeof this.state.user.idProfesional !== 'undefined') {
      this.props.dispatch(obtenerProblemasTodos())
      .then((response) => {
        this.setState({ problemas: response });
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

  render() {
    const { classes } = this.props;
    const { user, problemas } = this.state;

    return (
      <main className={classes.layout}>
        <Grid container spacing={24}>
        
          {/* --- Problema Publicados --- */}
          {user.idProfesional &&
            <Grid item xs={12} md={8}>
              <Card>
                  <CardHeader
                    title="Problemas Públicados"
                    subheader="Problemas públicados con tus rubros"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography variant="display2" color="textPrimary" align="center">
                        {problemas && problemas.length > 0 ? problemas.length : 'Sin problemas'}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="raised" color="primary"size="small" href="/problemas">Ver todos</Button>
                  </CardActions>
                </Card>
            </Grid>
          }

          {/* --- Problema Publicados Por El Usuario--- */}
            {user.idCliente &&
            <Grid item xs={12} md={8}>
              <Card>
                  <CardHeader
                    title="Tus Problemas"
                    subheader="Tus problemas públicados"
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography variant="display2" color="textPrimary" align="center">
                      {problemas && problemas.length > 0 ? problemas.length : 'Sin problemas'}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                    <Button variant="raised" color="primary"size="small" href="/problemas">Ver todos</Button>
                    <Button variant="raised" color="primary"size="small" href="/publicarProblema">Publica</Button>
                  </CardActions>
                </Card>
            </Grid> 
           }
          
          {/* --- Calificacion --- */}
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Calificacion"
                  subheader="Promedio de tus calificaciones"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      {user.calificacionPromedio} / 10
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          
          {/* --- Ultimos Trabajos Realizados --- */}
          {user.idProfesional &&
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Últimos Trabajos Realizados"
                  subheader="Últimos Trabajos del Mes"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      6 trabajos
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          }

          {/* --- Trabajos Activos --- */}
          {user.idProfesional &&
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Trabajos Activos"
                  subheader="Tus Trabajos actuales"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      3 trabajos
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          }

          {/* --- Calificacion Promedio del Rubro ---
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Calificacion Promedio de tu rubro"
                  subheader="Sabe como es la situación de tu rubro"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      5.8 / 10
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid> */}
          
          {/* --- Ingresos Historicos --- */}
          {user.idProfesional &&
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Ingresos Historicos"
                  subheader="Tus ingresos desde que te registraste totalizan"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      $23.312
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          }

          {/* --- Ingresos del ultimo mes --- */}
          {user.idProfesional &&
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Últimos Ingresos"
                  subheader="Tus ingresos del último mes totalizan"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      $4.754
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          }

          {/* --- Promedio de Ingreso --- */}
          {user.idProfesional &&
          <Grid item xs={12} md={4}>
            <Card>
                <CardHeader
                  title="Ingreso Promedio"
                  subheader="Tu ingreso promedio es de"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography variant="display2" color="textPrimary" align="center">
                      $4.520  
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          }

          </Grid>
      </main>
    );

  }

}

const styles = theme => ({
  pageTitle: {
    marginBottom: theme.spacing.unit * 3,
  },
  connect: {
    marginBottom: theme.spacing.unit * 3,
  }
});

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));