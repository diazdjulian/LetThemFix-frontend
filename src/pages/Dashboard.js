import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Material Components
import { withStyles } from '@material-ui/core/styles/';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    document.title = 'Dashboard | Consumer Pilot';
    
    // Initial state.
    this.state = {
      loading: false,
      user: props.user,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>

        <Grid container spacing={24}>
        
          {/* --- Problema Publicados --- */}
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
                      1,203
                    </Typography>
                  </div>
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                  <Button variant="raised" color="primary"size="small" href="/problemas">Ver todos</Button>
                </CardActions>
              </Card>
          </Grid>
          
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
                      7.7 / 10
                    </Typography>
                  </div>
                </CardContent>
              </Card>
          </Grid>
          
          {/* --- Ultimos Trabajos Realizados --- */}
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
          
          {/* --- Trabajos Activos --- */}
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
          
          {/* --- Ingresos del ultimo mes --- */}
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
          
          {/* --- Promedio de Ingreso --- */}
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